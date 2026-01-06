import Link from "next/link";

export default function NotFound() {
  return (
    <main className="not-found">
      <h1>Link no encontrado.</h1>
      <p className="mb-6 text-gray-700">
        Lo sentimos, no pudimos encontrar la página o recurso que buscabas.
      </p>
      <Link
        href="/"
        className="px-6 py-3 bg-thalys-red text-white rounded-lg hover:bg-red-700 transition"
      >
        Volver al inicio
      </Link>
    </main>
  );
}