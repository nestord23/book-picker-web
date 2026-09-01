import Biblioteca from "@/components/biblioteca/biblioteca";
import ProtectedRoute from "@/components/ProtectedRoute";

export default function BibliotecaPage() {
  return (
    <ProtectedRoute>
      <Biblioteca />
    </ProtectedRoute>
  );
}
