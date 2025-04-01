
import CoursesClientSide from "@/features/courses/components/CoursesClientSide";
import Head from "next/head";

function Courses() {
  return (
    <>
      <Head>
        <title>Курси лазерної епіляції, електроепіляції, шугарингу та воскової депіляції у Львові
        </title>
        <meta name="description" content="Наші курси - це не просто навчання, це досвід, яким ми готові поділитися з вами. По закінченні курсу ви отримаєте сертифікат та знання, які допоможуть вам стати професіоналом у своїй сфері."
        />
        <meta name="keywords" content="курси, лазерна депіляція, MS Laser, шугаринг, епіляція, навчання, сертифікація, львів" />
        <meta name="robots" content="index, follow" />
        <meta property="og:title" content="Курси електроепіляції, лазурної епіляції, воскової депіляції та шугарингу у Львові - Найкраще навчання | MS Laser" />
        <meta property="og:description" content="Наші курси - це не просто навчання, це досвід, яким ми готові поділитися з вами. По закінченні курсу ви отримаєте сертифікат та знання, які допоможуть вам стати професіоналом у своїй сфері." />
        <meta property="og:image" content="/assets/photos/carousel_2.webp" />
        <meta property="og:url" content={`${process.env.NEXT_PUBLIC_URL}/courses`}/>
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <CoursesClientSide />
    </>
  );
}

export default Courses;
