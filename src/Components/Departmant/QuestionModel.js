import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import {
  addDepartment,
  addAndUpdateQuestion,
  editDepartmant,
} from "../../Services/Apis/Api";
import { useParams } from "react-router-dom";
import {
  Box,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import { act } from "@testing-library/react";

const Options = ({
  action,
  res,
  newOptions,
  editValueDataArray,
  setEditValueDataArray,
  editValueArray,
  setEditValueArray,
  singleDepartmantInformation,
  setSingleDepartmantInformation,
  index,
  valueDataArray,
  valueArray,
  setValueArray,
  setValueDataArray,
}) => {
  const [valueOfvalue, setValueOfvalue] = React.useState(res);
  const [answerOfValue, setAnswerOfValue] = React.useState(
    action.type == "edit"
      ? singleDepartmantInformation.valueAgainstEveryRangeElement[index]
      : ""
  );
  React.useEffect(() => {
    console.log(editValueArray);
    console.log(editValueDataArray);
  }, [editValueArray, editValueDataArray]);

  return (
    <Grid style={{ textAlign: "center", marginTop: "20px" }}>
      {action.type == "edit" ? (
        <>
          <TextField
            placeholder="name"
            id={index}
            value={valueOfvalue}
            onChange={(e) => {
              setValueOfvalue(e.target.vlue);
              editValueArray[index] = e.target.value;
              editValueArray = [...editValueArray];
              setEditValueArray(editValueArray);
            }}
            width="50%"
          />
          <TextField
            type="number"
            placeholder="value"
            id={index}
            value={answerOfValue}
            onChange={(e) => {
              setAnswerOfValue(e.target.vlue);
              editValueDataArray[index] = e.target.value;
              setEditValueDataArray([...editValueDataArray]);
            }}
            width="50%"
            style={{ marginLeft: "20px" }}
          />
        </>
      ) : (
        <>
          <TextField
            placeholder="name"
            id={index}
            width="50%"
            onChange={(e, index) => {
              let arr = [...valueArray];
              arr[e.target.id] = e.target.value;

              setValueArray(arr);
              console.log(valueArray, "valueArray");
            }}
          />
          <TextField
            type="number"
            placeholder="value"
            id={index}
            width="50%"
            onChange={(e, index) => {
              let arr2 = [...valueDataArray];
              arr2[e.target.id] = e.target.value;

              setValueDataArray(arr2);
              console.log(valueDataArray, "valueDataArray");
            }}
            style={{ marginLeft: "20px" }}
          />
        </>
      )}
    </Grid>
  );
};

export default function QuestionModel({
  action,
  dispatch,
  getDepartmentList,
  setAction,
  singleDepartmantInformation,
  setSingleDepartmantInformation,
  setOpenAlert,
}) {
  const [open, setOpen] = React.useState(false);
  const [questionData, setQuestionData] = React.useState({
    question: "",
  });
  const [numberOfQuestion, setNumberOfQuestion] = React.useState(0);
  const [numberOfQuestionArray, setNumberOfQuestionArray] = React.useState([]);

  const [range, setRange] = React.useState({
    startRange: "",
    endRange: "",
  });
  let [valueArray, setValueArray] = React.useState([]);
  let [editValueArray, setEditValueArray] = React.useState([]);

  let [valueDataArray, setValueDataArray] = React.useState([]);
  let [editValueDataArray, setEditValueDataArray] = React.useState([]);

  let [newOptions, setNewOptions] = React.useState({});

  React.useEffect(() => {
    console.log(newOptions);
  }, [newOptions]);

  const handelChangeOfQuestionNumber = (e) => {};

  const { departmentId, departmentName, schemeId } = useParams();
  console.log(departmentId, departmentName, "departmentId");
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const closeDialog = () => {
    setAction({ ...action, open: false });
    setQuestionData({ question: "" });
    setNumberOfQuestionArray([]);
    setSingleDepartmantInformation({
      answer:"",
      noofButtons: "",
      question: "",
      range:  [],
      valueAgainstEveryRangeElement:[]
      })
  };

  React.useEffect(() => {
    console.log(action);
    action.type != "add"
      ? setQuestionData({ question: singleDepartmantInformation.question })
      : setQuestionData({ question: "" });
    action.type != "add"
      ? setNumberOfQuestion(singleDepartmantInformation.range.length)
      : setNumberOfQuestion(0);
    action.type != "add"
      ? setNumberOfQuestionArray(singleDepartmantInformation.range)
      : setNumberOfQuestionArray([]);
    action.type != "add"
      ? setEditValueArray(singleDepartmantInformation.range)
      : setEditValueArray([]);
    action.type != "add"
      ? setEditValueDataArray(
          singleDepartmantInformation.valueAgainstEveryRangeElement
        )
      : setValueDataArray([]);

    if (action.type != "add") {
      console.log(singleDepartmantInformation.range);
      singleDepartmantInformation.range.map((val, index) => {
        // newOptions.push({key:val,value:singleDepartmantInformation.valueAgainstEveryRangeElement[index]})
        Object.assign(newOptions, {
          [`data${index}`]: {
            key: val,
            value:
              singleDepartmantInformation.valueAgainstEveryRangeElement[index],
          },
        });
        console.log(newOptions);
        setNewOptions({ ...newOptions });
      });
    }
  }, [singleDepartmantInformation, action]);
  async function addScheme() {
    if (questionData.question) {
      try {
        var date = new Date();
        var components = [
          date.getYear(),
          date.getMonth(),
          date.getDate(),
          date.getHours(),
          date.getMinutes(),
          date.getSeconds(),
          date.getMilliseconds(),
        ];

        var id = `question${components.join("")}`;
        let rangeArray = [];
        for (
          let rangeSet = parseInt(range.startRange);
          rangeSet <= parseInt(range.endRange);
          rangeSet++
        ) {
          rangeArray.push(rangeSet);
        }
        console.log(
          editValueArray,
          editValueDataArray,
          "singleDepartmantInformation"
        );
        let sendQuestionData =
          action.type == "edit"
            ? {
                question: questionData.question,
                schemeId: schemeId,
                questionId: singleDepartmantInformation._id,
                range: editValueArray,
                valueAgainstEveryRangeElement: editValueDataArray,
                noofButtons: 5,
              }
            : {
                question: questionData.question,
                schemeId: schemeId,
                range: valueArray,
                valueAgainstEveryRangeElement: valueDataArray,
                noofButtons: 5,
              };
        var data = {
          schemeId: singleDepartmantInformation.schemeId,
          questionId: id,
          schemeName: questionData,
        };
        action.type == "edit"
          ? await dispatch(
              addAndUpdateQuestion({
                data: sendQuestionData,
                departmentId: departmentId,
              })
            )
          : await dispatch(
              addAndUpdateQuestion({
                data: sendQuestionData,
                departmentId: departmentId,
              })
            );
        setNumberOfQuestionArray([]);
        setOpenAlert({
          open: true,
          mssg:
            action.type == "edit"
              ? "Question edit successfully"
              : "Question add successfully",
          type: "success",
        });
        setAction({ ...action, open: false });
        getDepartmentList();
      } catch (err) {
        setOpenAlert({
          open: true,
          mssg: "Something Wrong",
          type: "error",
        });
      }
    } else {
      setOpenAlert({
        open: true,
        mssg: "Question is required",
        type: "error",
      });
    }
  }

  return (
    <div>
      <Dialog
        open={action.open}
        style={{ height: "100%" }}
        onClose={() => closeDialog()}
      >
        <DialogTitle>
          {action.type == "add" ? "Add Question" : "Edit Question"}
        </DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Question"
            type="text"
            value={questionData.question}
            onChange={(e) => setQuestionData({ question: e.target.value })}
            fullWidth
            variant="outlined"
            rows={5}
            multiline
          />
          {/*<Box>
                <TextField
                autoFocus
                margin="dense"
                
                label="Start Range"
                type="text"
                value={range.startRange}
                
                onChange={(e)=>setRange({...range,startRange:e.target.value})}
                variant="outlined"
                
                />
                <TextField
                autoFocus
                margin="dense"
                value={range.endRange}
                
                label="End Range"
                type="text"
               
                onChange={(e)=>setRange({...range,endRange:e.target.value})}
                style={{marginLeft:"10px"}}
                variant="outlined"
                
                />
  </Box>*/}

          <FormControl style={{ marginTop: "20px" }} fullWidth>
            <InputLabel id="demo-simple-select-label">Range</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={numberOfQuestion}
              label="Range"
              onChange={(e) => {
                setNumberOfQuestion(e.target.value);
                console.log("numberOfQuestionArray", numberOfQuestionArray);
                // numberOfQuestionArray = []
                console.log(e.target.value, "numberOfQuestionArray");
                let newOne = [];

                for (let number = 0; number < e.target.value; number++) {
                  newOne.push("");
                }
                setNumberOfQuestionArray(newOne);

                if (action.type == "edit") {
                  console.log(editValueArray.length, e.target.value);
                  if (editValueArray.length > e.target.value) {
                    let newOneEditValueArray = [];
                    let newOneEditValueDataArray = [];

                    console.log(editValueArray.length - e.target.value);
                    for (let i = 0; i < e.target.value; i++) {
                      console.log("hiii", i, newOne.length);
                      newOneEditValueArray.push(editValueArray[i]);
                      newOneEditValueDataArray.push(editValueDataArray[i]);
                    }

                    setEditValueArray([...newOneEditValueArray]);
                    setEditValueDataArray([...newOneEditValueDataArray]);
                  }
                }

                console.log("numberOfQuestionArray", numberOfQuestionArray);
              }}
            >
              {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((value) => {
                return <MenuItem value={value}>{value}</MenuItem>;
              })}
            </Select>
          </FormControl>
          {numberOfQuestionArray.map((res, index) => {
            return (
              <Options
                res={res}
                editValueDataArray={editValueDataArray}
                setEditValueDataArray={setEditValueDataArray}
                setEditValueArray={setEditValueArray}
                editValueArray={editValueArray}
                index={index}
                action={action}
                singleDepartmantInformation={singleDepartmantInformation}
                valueDataArray={valueDataArray}
                valueArray={valueArray}
                setValueArray={setValueArray}
                setValueDataArray={setValueDataArray}
              />
            );
          })}
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              closeDialog();
              setNumberOfQuestionArray([]);
            }}
          >
            Cancel
          </Button>
          <Button onClick={() => addScheme()}>Add</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
