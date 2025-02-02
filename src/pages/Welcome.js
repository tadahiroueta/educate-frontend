import { Link } from "react-router-dom";

export default function Welcome() {
  return(
    <div className="grow w-full flex flex-col justify-center">
      {/* welcome banner */}
      <div className="w-full min-h-lvh relative bg-[url('../public/graduation-stock.jpg')] bg-cover bg-center">
        {/* black filter */}
        <div className="absolute inset-0 bg-black bg-opacity-30" />
        {/* text */}
        <div className="relative w-full h-full z-10 flex flex-col justify-center items-center gap-10">
          <h1 className="w-2/3 font-plain text-8xl leading-snug font-bold text-white text-center">Learning Education with E-ducate</h1>
          <h4 className="font-plain text-xl text-white">"Unlock the power of smarter studying with E-ducate"</h4>
          <Link to="/" className="px-8 py-4 bg-white rounded">
            <h4 className="font-components font-bold">CONTACT US</h4>
          </Link>
        </div>
      </div>
      {/* about us */}
      <div className="w-full flex">
        {/* text */}
        <div className="w-1/2 flex flex-col gap-16 px-28 py-14 bg-slate-800">
          <h2 className="text-5xl font-bold font-plain text-white">About Us</h2>
          <p className="text-base font-plain text-white">Our future app aims to provide equal opportunities for success in learning education by making it accessible to everyone. We believe that our platform can help students achieve their academic goals and reach their full potential with ease and confidence.</p>
          <p className="text-base font-plain text-white">Our app uses AI technology and short videos for personalized learning experiences. It tracks progress and adapts to individual needs, offering quizzes and flashcards for motivation. Our goal is to make education accessible and enjoyable for all.</p>
        </div>
        <img src="note-taking-stock.jpg" alt="note-taking" className="w-1/2" />
      </div>
      {/* services */}
      <div className="w-full p-4 flex flex-col items-center bg-white gap-12">
        <h2 className="text-6xl font-plain font-bold">OUR SERVICES</h2>
        <hr className="w-16" />
        <div className="flex justify-center gap-16">
          {/* flashcards */}
          <Link to="/flashcard" className="w-80 flex flex-col gap-4 items-center">
            <img src="multiple-choice-stock.jpg" alt="multiple-choice" className="w-80 h-80 rounded-full" />
            <h3 className="text-center text-xl font-plain capitalize" >FLASHCARDS</h3>
            <p className="text-center font-plain">Sit Tests on the coursees you study for so you can succeed in your final exams</p>
          </Link>
          {/* blogs */}
          <Link to="/blog" className="w-80 flex flex-col gap-4 items-center">
            <img src="tree-library-stock.jpg" alt="tree-library" className="w-80 h-80 rounded-full" />
            <h3 className="text-center text-xl font-plain capitalize" >BLOGS</h3>
            <p className="text-center font-plain">You can still be learning education while having a break with our education social media</p>
          </Link>
        </div>
      </div>
    </div>
  );
}