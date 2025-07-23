import BackgroundSlider from "@/components/common/BackgroundSlider";

const slides = [
  {
    image: "/images/herosection_img1.avif",
    title:
      "The most exotic countries in the world: an adventure beyond the familiar",
    subtitle:
      "The world is full of fascinating and exotic destinations that captivate adventurers and culture enthusiasts alike.",
    category: "Travel",
    date: "July 14, 2025",
  },
  {
    image: "/images/herosection_img2.avif",
    title:
      "The most beautiful places in Europe: discover the best travel destinations on CHECK24",
    subtitle:
      "Europe is a continent rich in history, culture, and breathtaking landscapes. Whether you're seeking adventure, wanting to immerse yourself in a city's culture, or simply looking to relax, Europe has something for everyone.",
    category: "Travel",
    date: "July 14, 2025",
  },
  {
    image: "/images/herosection_img3.avif",
    title: "Feel the Nature",
    subtitle: "Escape the ordinary",
    category: "Travel",
    date: "July 14, 2025",
  },
];

export default function HeroSection() {
  return (
    <section>
      <BackgroundSlider slides={slides} duration={5000} zoomScale={1.3} />
    </section>
  );
}
