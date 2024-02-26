import { Link } from "react-router-dom";

export default function SuccessPage() {
  return (
    <div>
      <h1>Thank you for the purchase 🎉</h1>
      We will proceed your payment and send a confirmation.
      <Link className="link" to="/">Go Back Home</Link>
    </div>
  );
}



