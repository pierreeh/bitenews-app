export default function PublicFooter() {
  return (
    <footer className="py-4 px-6 bg-black text-white public-footer">
      <p className="text-center text-xs font-extralight opacity-55">
        &copy; {new Date().getFullYear()}{' '}
        <span className="font-normal">Bitenews</span>
      </p>
    </footer>
  );
}
