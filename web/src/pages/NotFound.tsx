export default function NotFound() {
  return (
    <div className="mt-5 text-center">
      <div className="mb-3 font-uibold text-[24px]">Page not found</div>
      <div className="text-gray-400">{window.location.href.toString()}</div>
    </div>
  );
}
