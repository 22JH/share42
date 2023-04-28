import * as React from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { CSSInterpolation } from "@emotion/serialize";

interface PropType {
  width?: CSSInterpolation;
  height?: CSSInterpolation;
  marginRight?: CSSInterpolation;
  marginBottom?: CSSInterpolation;
  marginLeft?: CSSInterpolation;
  marginTop?: CSSInterpolation;
  data: string[];
  content?: string;
  setValue: React.Dispatch<React.SetStateAction<string>>;
}

export default function DropDown({
  width = 100,
  // height,
  marginRight = 0,
  marginBottom = 0,
  marginLeft = 0,
  marginTop = 0,
  data,
  content = "",
  setValue,
}: PropType) {
  const [current, setCurrent] = React.useState("");
  const handleChange = (event: SelectChangeEvent<string>) => {
    setCurrent(() => event.target.value);
    setValue(() => event.target.value);
  };
  React.useEffect(() => {
    setCurrent(() => "");
  }, [data]);
  return (
    <div>
      <FormControl
        sx={{
          minWidth: 50,
          width: width as number,
          marginRight: marginRight as number,
          marginLeft: marginLeft as number,
          marginBottom: marginBottom as number,
          marginTop: marginTop as number,
          color: "black",
        }}
        size="small"
      >
        <InputLabel>{content}</InputLabel>
        <Select
          value={data?.includes(current) ? current : ""}
          onChange={handleChange}
          label={content}
        >
          {data?.map((ele: string, idx: number) => (
            <MenuItem value={ele} key={idx}>
              {ele ? ele : null}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
}
