import Header from "@/components/common/Header";
import Footer from "@/components/common/Footer";


export default function MainLayout(
  { children }: Readonly<{
    children: React.ReactNode;
  }>) {
  return (
    <html lang="en">
      <Header></Header>
            {children}
            <Footer></Footer>
    </html>
  );
}
