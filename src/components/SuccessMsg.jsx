import img from "../assets/icon-success-check.svg"

export default function Success() {
    return (
        <aside className="success-container">
            <h2><img src={img} alt="check" /><span>Message Sent!</span></h2>
            <p>Thanks for completing the form. We will be in touch soon!</p>
        </aside>
    )
}