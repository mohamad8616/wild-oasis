"use server";

import { revalidatePath } from "next/cache";
import { auth, signIn, signOut } from "./auth";
import { supabase } from "./supabase";
import { getBookings } from "./data-service";
import { redirect } from "next/navigation";

export async function signInAction() {
  await signIn("google", { redirectTo: "/account" });
}
export async function signOutAction() {
  await signOut({ redirectTo: "/" });
}

export async function updateGuest(formData) {
  const session = await auth();
  if (!session) throw new Error("You must be logged in");
  const nationalID = formData.get("nationalID");
  const [nationality, countryFlag] = formData.get("nationality").split("%");

  // Regex to check for an alphanumeric string between 6 and 12 characters
  const nationalIDRegex = /^[a-zA-Z0-9]{6,12}$/;

  if (!nationalIDRegex.test(nationalID)) {
    throw new Error("Provide a valit national ID");
  }
  const updateData = { nationalID, nationality, countryFlag };

  const { data, error } = await supabase
    .from("guests")
    .update(updateData)
    .eq("id", session.user.guestId);

  if (error) throw new Error("Guest could not be updated");
  revalidatePath("/account/profile");
}

export async function deleteReservation(bookingId) {
  const session = await auth();
  if (!session) throw new Error("You must be logged first");
  const { error } = await supabase
    .from("bookings")
    .delete()
    .eq("id", bookingId);

  const guestBookings = await getBookings(session.user.guestId);
  const guestBookingsId = guestBookings.map((booking) => booking.id);

  if (!guestBookingsId)
    throw new Error("Your not allowed to delete this bookings");

  if (error) throw new Error("Booking could not be deleted");
  revalidatePath("/account/reservation");
}

export async function ReservationEdit(formData) {
  const id = Number(formData.get("reservationId"));
  //AUTHENTICATION
  const session = await auth();
  if (!session) throw new Error("You must be logged in first!");

  //AUTHORIZATION
  const guestBookings = await getBookings(session.user.guestId);
  const guestBookingIds = guestBookings.map((booking) => booking.id);

  if (!guestBookingIds.includes(id))
    throw new Error("You are not valid to edit this booking");

  const updateData = {
    // Add the fields you want to update here
    numGuests: formData.get("numGuests"),
    observations: formData.get("observations"),
  };

  const { error } = await supabase
    .from("bookings")
    .update(updateData)
    .eq("id", id)
    .select()
    .single();

  if (error) throw new Error("Booking could not be updated");
  revalidatePath("/account/reservation");
  redirect("/account/reservation");
}

export async function createBooking(bookingData, formData) {
  //AUTHENTICATION
  const session = await auth();
  if (!session) throw new Error("You must be logged in first!");

  // CREATE BOOKING
  const newbooking = {
    ...bookingData,
    guestId: session.user.guestId,
    numGuests: formData.get("numGuests"),
    observations: formData.get("observations").slice(0, 1000),
    extraPrice: 0,
    totalPrice: bookingData.cabinPrice,
    isPaid: false,
    hasBreakfast: false,
    status: "unconfirmed",
  };

  const { data, error } = await supabase.from("bookings").insert([newbooking]);
  console.log(newbooking, data);

  if (error) throw new Error("Booking could not be created");
  revalidatePath(`/cabins/${bookingData.cabinId}`);
  redirect("/cabins/thankyou");
}
