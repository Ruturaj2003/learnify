import Link from 'next/link';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t bg-background py-6 md:py-10">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center gap-4 md:flex-row md:justify-between">
          <div className="flex items-center gap-2">
            <p className="text-sm text-gray-500">
              © {new Date().getFullYear()} Dotaizz. All rights reserved.
            </p>
          </div>
          <div className="flex items-center gap-4">
            <a
              href="#"
              className="text-sm font-medium text-gray-500 hover:underline underline-offset-4"
            >
              Terms
            </a>
            <a
              href="#"
              className="text-sm font-medium text-gray-500 hover:underline underline-offset-4"
            >
              Privacy
            </a>
            <a
              href="#"
              className="text-sm font-medium text-gray-500 hover:underline underline-offset-4"
            >
              Contact
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
