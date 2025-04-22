function Contact() {
    return (
      <section className="p-6 max-w-3xl mx-auto mt-6">
        <h2 className="text-2xl font-semibold mb-4">Контакти</h2>
        <ul className="space-y-2 text-blue-600">
          <li>
            📧 Email: <a href="mailto:example@gmail.com" className="underline">example@gmail.com</a>
          </li>
          <li>
            💼 LinkedIn: <a href="https://linkedin.com/in/yourname" className="underline">linkedin.com/in/yourname</a>
          </li>
          <li>
            🐙 GitHub: <a href="https://github.com/yourusername" className="underline">github.com/yourusername</a>
          </li>
        </ul>
      </section>
    );
  }
  
  export default Contact;
  