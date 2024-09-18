import { Button } from "flowbite-react";

const CallToAction = () => {
  return (
    <div className="flex flex-col sm:flex-row p-3 border border-teal-500 justify-center items-center rounded-tl-3xl rounded-br-3xl text-center">
      <div className="flex-1 justify-center flex flex-col">
        <h2 className="text-2xl">Want to learn more about JavaScript</h2>
        <p className="text-gray-500 my-2">
          Checkout these resources with 100 JavaScript Projects
        </p>
        <Button
          gradientDuoTone="purpleToPink"
          className="rounded-tl-xl rounded-bl-none"
        >
          <a
            href="https://javascript30.com/"
            target="_blank"
            rel="noopener norefferer"
          >
            30 Day Vanilla JS Coding Challenge
          </a>
        </Button>
      </div>
      <div className="p-7 flex-1">
        <img
          src="https://media.dev.to/cdn-cgi/image/width=1000,height=420,fit=cover,gravity=auto,format=auto/https%3A%2F%2Fdev-to-uploads.s3.amazonaws.com%2Fuploads%2Farticles%2Fh2cbwyhjy514ltfrezah.png"
          alt="30 days javascript"
        />
      </div>
    </div>
  );
};

export default CallToAction;
