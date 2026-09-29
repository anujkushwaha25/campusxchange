import "./Testimonial.css";

import {
  FaStar,
  FaQuoteLeft,
} from "react-icons/fa";

function Testimonial() {

  const reviews = [

    {
      id:1,
      name:"Anuj Kushwaha",
      course:"MCA 3rd Semester",
      image:"",
      review:"I sold my engineering books within two days. The buyer was verified and the whole process was smooth.",
    },

    {
      id:2,
      name:"Nikhil Raykwar",
      course:"MCA 3rd Semester",
      image:"",
      review:"Found a study table at half the market price. CampusXchange saved both my money and time.",
    },

    {
      id:3,
      name:"Priyanshu ",
      course:"MCA • Final Year",
      image:"",
      review:"The best student marketplace. I purchased electronics safely from a verified senior.",
    }

  ];

  return (

<section className="testimonial"data-aos="fade-up">

<div className="testimonial-heading">

<span>Student Reviews</span>

<h2>
Loved By Students
Across Campus
</h2>

<p>
See what students are saying after using CampusXchange.
</p>

</div>

<div className="testimonial-container">

{reviews.map((item)=>(

<div className="testimonial-card" key={item.id}>

<div className="quote">

<FaQuoteLeft/>

</div>

<div className="stars">

<FaStar/>
<FaStar/>
<FaStar/>
<FaStar/>
<FaStar/>

</div>

<p className="review">
{item.review}
</p>

<div className="student">

<img
src={item.image}
alt={item.name}
/>

<div>

<h4>{item.name}</h4>

<span>{item.course}</span>

</div>

</div>

</div>

))}

</div>

</section>

  );
}

export default Testimonial;