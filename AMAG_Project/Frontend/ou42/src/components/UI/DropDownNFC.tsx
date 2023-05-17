import * as React from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { CSSInterpolation } from "@emotion/serialize";

const prePro = (data: any) => {
  let statusName;
  if (data === 0) statusName = "대여";
  else if (data === 1) statusName = "반납";
  else if (data === 2) statusName = "수납";
  else if (data === 3) statusName = "회수";
  return statusName;
};

interface PropType {
  width?: CSSInterpolation;
  height?: CSSInterpolation;
  marginRight?: CSSInterpolation;
  marginBottom?: CSSInterpolation;
  marginLeft?: CSSInterpolation;
  marginTop?: CSSInterpolation;
  data: any;
  content?: string;
  setValue: React.Dispatch<React.SetStateAction<string>>;
  setStatus: React.Dispatch<React.SetStateAction<number>>;
}

export default function DropDownNFC({
  width = 100,
  // height,
  marginRight = 0,
  marginBottom = 0,
  marginLeft = 0,
  marginTop = 0,
  data,
  content = "", //라벨
  setValue,
  setStatus,
}: PropType) {
  const [current, setCurrent] = React.useState("");

  const handleChange = (event: SelectChangeEvent<string | any>) => {
    setCurrent(() => event.target.value);
    setValue(() => event.target.value);

    setStatus(() => event.target.value.requestType);
    console.log(event.target.value.requestType);
  };
  return (
    <div>
      <FormControl
        sx={{
          minWidth: 50,
          width: width as string,
          marginRight: marginRight as string,
          marginLeft: marginLeft as string,
          marginBottom: marginBottom as string,
          marginTop: marginTop as string,
          color: "black",
        }}
        size="small"
      >
        <InputLabel>{content}</InputLabel>
        <Select value={current} onChange={handleChange} label={content}>
          {data?.map((ele: any, idx: number) => (
            <MenuItem value={ele} key={idx}>
              {ele
                ? `${ele.shareArticleName} (${prePro(ele.requestType)})`
                : null}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
}
