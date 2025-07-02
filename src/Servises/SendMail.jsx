export const sendMail = async (to, subject, text) => {
  try {
    const response = await fetch("https://ls-studio.vercel.app/api/sendMail", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ to, subject, text }),
    });

    if (!response.ok) throw new Error("Błąd wysyłki");

    console.log("E-mail wysłany!");
  } catch (error) {
    console.error("Błąd:", error);
  }
};
