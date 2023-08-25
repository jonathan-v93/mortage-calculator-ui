import { GetMortgageCalculation } from "./hooks/getMortgageCalculation";
import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { useEffect, useState } from "react";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { PaymentScheduleEnum } from "./models/PaymentSchedule.enum";
import CircularProgress from "@mui/material/CircularProgress";

export const Calculator = () => {
  // const GetMortgageCalculation
  const [propertyPrice, setPropertyPrice] = useState("100000");
  const [downPayment, setDownPayment] = useState("10000");
  const [annualInterest, setAnnualInterest] = useState("0.05");
  const [lengthOfMortgage, setLengthOfMortgage] = useState("30");
  const [paymentSchedule, setPaymentSchedule] = useState("1");
  const [queryString, setQueryString] = useState("");

  useEffect(() => {}, []);

  const { calculatedResponse, isLoading } = GetMortgageCalculation(queryString);

  const getQueryString = (): string => {
    return `?propertyPrice=${propertyPrice}&downPayment=${downPayment}&annualInterest=${annualInterest}&lengthOfMortgage=${lengthOfMortgage}&paymentSchedule=${paymentSchedule}`;
  };

  const getCalculation = () => {
    // validation here
    const query: string = getQueryString();
    setQueryString(query);
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "50vh",
      }}
    >
      <Box
        component="form"
        sx={{
          "& .MuiTextField-root": { m: 1, width: "25ch" },
        }}
        noValidate
        autoComplete="off"
      >
        <div>
          <TextField
            label="Property price"
            value={propertyPrice}
            onChange={(e) => setPropertyPrice(e.target.value)}
          />
        </div>
        <div>
          <TextField
            label="Down payment"
            value={downPayment}
            onChange={(e) => {
              setDownPayment(e.target.value);
            }}
          />
        </div>
        <div>
          <TextField
            label="Annual interest"
            value={annualInterest}
            onChange={(e) => setAnnualInterest(e.target.value)}
          />
        </div>
        <div>
          <TextField
            label="Length of mortgage"
            value={lengthOfMortgage}
            onChange={(e) => setLengthOfMortgage(e.target.value)}
          />
        </div>
        <div>
          {/* <TextField
            label="Payment schedule"
            value={paymentSchedule}
            onChange={(e) => setPaymentSchedule(e.target.value)}
          /> */}
          <FormControl style={{ width: "25ch", marginBottom: "1em" }}>
            <InputLabel>Payment schedule</InputLabel>
            <Select
              value={paymentSchedule}
              label="Payment schedule"
              onChange={(e) => setPaymentSchedule(e.target.value)}
            >
              <MenuItem value={PaymentScheduleEnum.AcceleratedBiWeekly}>
                Accelerated bi-weekly
              </MenuItem>
              <MenuItem value={PaymentScheduleEnum.BiWeekly}>
                Bi-weekly
              </MenuItem>
              <MenuItem value={PaymentScheduleEnum.Monthly}>Monthly</MenuItem>
            </Select>
          </FormControl>
        </div>
        <Button
          disabled={isLoading}
          onClick={getCalculation}
          variant="contained"
        >
          Calculate repayment price
        </Button>
        {!isLoading && calculatedResponse !== null && (
          <div style={{ marginTop: "2em" }}>Result: {calculatedResponse}</div>
        )}
        {isLoading && (
          <div
            style={{
              width: "50vw",
            }}
          >
            <CircularProgress></CircularProgress>
          </div>
        )}
      </Box>
    </div>
  );
};
