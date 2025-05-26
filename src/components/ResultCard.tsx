export default function ResultCard({ result }: { result: number }) {
  return (
   	<div className="bg-slate-100 p-4 rounded-xl text-center shadow-md">
	  <h2 className="text-xl font-semibold text-slate-700">Estimated Pods Required:</h2>
	  <p className="text-3xl font-bold text-slate-800 mt-2">{result}</p>
	</div>
  );
}