type Props = {
  card: {
    id: string;
    title: string;
    desc: string;
    paypal_ID: string;
    stripes_ID: string;
    image: string;
  };
};
function ShopCard({ card }: Props) {
  return (
    <div className="card w-96 bg-base-100 shadow-xl">
      <figure>
        <img src="/chloe.png" alt="Shoes" />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{card.title}</h2>
        <p>{card.desc}</p>
        <div className="card-actions justify-end items-center">
          <label htmlFor="amount">Amount:</label>
          <input
            id="amount"
            type="number"
            placeholder="1"
            max={10}
            min={1}
            className="input w-12 h-fit p-0 pl-2"
          ></input>{" "}
          <button className="btn btn-warning">PayPal</button>
          {/* TThis Would be a Paypal Button */}
          <button className="btn btn-primary">Buy Now</button>
          {/* This Would a Stripes button */}
        </div>
      </div>
    </div>
  );
}
export default ShopCard;
