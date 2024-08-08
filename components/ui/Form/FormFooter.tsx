import Link from "next/link";
import React from "react";

const FormFooter = ({
  buttonText,
  showExtraText,
  isSignUp,
  isLogin,
}: {
  buttonText: string;
  showExtraText?: boolean;
  isSignUp?: boolean;
  isLogin?: boolean;
}) => {
  return (
    <div className="space-y-4">
      <button className="w-full rounded-full text-sm open-sans py-3 bg-primary text-white my-4">
        {buttonText}
      </button>
      {showExtraText && (
        <p className="text-sm text-center">
          {isSignUp ? (
            <span>
              Already have an account? <Link href="" className="text-primary">Sign in</Link>
            </span>
          ) : (
            <span>
              Don&apos;t have an account? <Link href="" className="text-primary">Sign up</Link>
            </span>
          )}
        </p>
      )}
    </div>
  );
};

export default FormFooter;
