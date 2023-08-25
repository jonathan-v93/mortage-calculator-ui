import { useEffect, useState } from "react";
import axios from "axios";

export const GetMortgageCalculation = (queryString: string) => {
  const baseURL =
    "https://tza2ahe76k.execute-api.us-west-1.amazonaws.com/mortgageCalculator";
  const [calculatedResponse, setCalcultedResponse] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (queryString && queryString.length > 0) {
      setIsLoading(true);
      axios
        .get(`${baseURL}${queryString}`)
        .then((response) => {
          console.log(response);
          setIsLoading(false);
          setCalcultedResponse(response.data);
        })
        .catch((err) => {
          setIsLoading(false);
          if (err.response) {
            console.log("here", err.response.data);
            setCalcultedResponse(err.response.data.message);
          } else {
            setCalcultedResponse(null);
          }
        });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [queryString]);

  return { calculatedResponse, isLoading };
};
