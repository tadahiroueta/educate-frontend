import dedent from "dedent";
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import Markdown from "react-markdown";

import { SmallBlogPreview, TopicPill } from "../components"

export default function BlogSession() {
  const { document } = useParams();

  const [article, setArticle] = useState({});

  const relatedArticles = [
    {
      thumbnail: "https://s3-alpha-sig.figma.com/img/86e2/d986/f2ce6628b68ce0b9d8e73af68ca9f0ee?Expires=1730073600&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=gmuwYCiZ1d2DAy9jNjbyM~dc0q6HccjK2ZhmXK5l8yHrEXlvR3Li4FvQkovf3nrDxZQX22D9J-V67i5Z9cPCYJsjkH93tf1IoFURaVzXB0EagtyYYUPG0hMKWKvFAiTxa2RMqs5HJKmnVX1kE-MJlVxAEipObTH4KC4~PL1Gk5NNh7WPQHIwoZdBg4HD6ov61s2jFpv5SKnZklgE5IrS9NdLkFYhx0ZcdCDk-nj5Eadaie~jbh599eTpNyznQd6cdJA1D1C-oVHwEu1dXWbmDOznMT4Ql3q58xUjjhPdH0P7qdE-uL58oeyOT22PO1lWKtUpa6K5ra-GheUfoN9OFw__",
      title: "How AI Could Shape the Future of Education",
      description: "The world’s attention is now fixed on the unfolding impact of AI tools on knowledge and creator economies – and classrooms are no exception. ChatGPT and other AI...",
      topic: "Education",
      date: "March 6, 2024"
    },
    // lorem 
    {
      thumbnail: "https://s3-alpha-sig.figma.com/img/86e2/d986/f2ce6628b68ce0b9d8e73af68ca9f0ee?Expires=1730073600&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=gmuwYCiZ1d2DAy9jNjbyM~dc0q6HccjK2ZhmXK5l8yHrEXlvR3Li4FvQkovf3nrDxZQX22D9J-V67i5Z9cPCYJsjkH93tf1IoFURaVzXB0EagtyYYUPG0hMKWKvFAiTxa2RMqs5HJKmnVX1kE-MJlVxAEipObTH4KC4~PL1Gk5NNh7WPQHIwoZdBg4HD6ov61s2jFpv5SKnZklgE5IrS9NdLkFYhx0ZcdCDk-nj5Eadaie~jbh599eTpNyznQd6cdJA1D1C-oVHwEu1dXWbmDOznMT4Ql3q58xUjjhPdH0P7qdE-uL58oeyOT22PO1lWKtUpa6K5ra-GheUfoN9OFw__",
      title: "Lorem Ipsum Dolor Sit Amet",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam nec purus nec nunc ultricies...",
      topic: "Technology",
      date: "March 5, 2024"
    },
    {
      thumbnail: "https://s3-alpha-sig.figma.com/img/86e2/d986/f2ce6628b68ce0b9d8e73af68ca9f0ee?Expires=1730073600&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=gmuwYCiZ1d2DAy9jNjbyM~dc0q6HccjK2ZhmXK5l8yHrEXlvR3Li4FvQkovf3nrDxZQX22D9J-V67i5Z9cPCYJsjkH93tf1IoFURaVzXB0EagtyYYUPG0hMKWKvFAiTxa2RMqs5HJKmnVX1kE-MJlVxAEipObTH4KC4~PL1Gk5NNh7WPQHIwoZdBg4HD6ov61s2jFpv5SKnZklgE5IrS9NdLkFYhx0ZcdCDk-nj5Eadaie~jbh599eTpNyznQd6cdJA1D1C-oVHwEu1dXWbmDOznMT4Ql3q58xUjjhPdH0P7qdE-uL58oeyOT22PO1lWKtUpa6K5ra-GheUfoN9OFw__",
      title: "Lorem Ipsum Dolor Sit Amet",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam nec purus nec nunc ultricies...",
      topic: "Education",
      date: "March 4, 2024"
    }
  ];

  useEffect(() => {
    axios.get("https://educate-backend-69dte.ondigitalocean.app/api/get_blog/" + encodeURIComponent(document))
      .then((response) => {
        console.log('API Response:', response.data);
        setArticle(response.data);
      })
      .catch((err) => {
        console.log('Error fetching data:', err);
      });
  }, [document]);

  if (!article) return null;

  return (
    <div className="grow w-full flex justify-center bg-educate-blue-100 pt-10 pb-44">
      {/* inner */}
      <div className="w-1/2 flex flex-col items-center">
        {/* header */}
        <div className="flex flex-col items-center gap-4">
          <h1 className="font-plain font-medium text-3xl text-center">{ article.title }</h1>
          {/* subheading */}
          <div className="flex items-center gap-6">
            <TopicPill>{ article.topic }</TopicPill>
            <p>|</p>
            <div className="font-plain text-sm">{ article.date }</div>
          </div>
        </div>
        <Markdown className="w-full max-w-none pt-2 pb-12 prose prose-img:rounded-lg prose-p:font-plain prose-headings:font-plain">{ article.content }</Markdown>
        {/* other blogs */}
        <div className="w-full flex flex-col items-center gap-4">
          <h3 className="text-lg font-plain font-medium">⏰ Recent posts</h3>
          <div className="w-full flex gap-2">
            { relatedArticles.map((article, index) => (<SmallBlogPreview key={ index } thumbnail={ article.thumbnail } title={ article.title } description={ article.description } topic={ article.topic } date={ article.date } />)) }
          </div>
        </div>
      </div>
    </div>
  );
}