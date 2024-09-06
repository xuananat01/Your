import React, { useEffect, useState } from "react";
import { View, TouchableOpacity, Text, StyleSheet } from "react-native";
import { Calendar } from "react-native-big-calendar";
import dayjs from "dayjs";
import Orientation from "react-native-orientation-locker";

const events = [
  {
    title: "Meeting",
    start: dayjs("2023-02-10").set("hour", 10).set("minute", 0).toDate(),
    end: dayjs("2023-02-10").set("hour", 10).set("minute", 30).toDate()
  },
  {
    title: "Lunch break",
    start: dayjs("2023-02-11").set("hour", 1).set("minute", 0).toDate(),
    end: dayjs("2023-02-11").set("hour", 2).set("minute", 0).toDate()
  }
];

function Calendardemo() {
  const [mode, setmode] = useState("day");

  const onEventPress = (event) => {
    console.log(event);
  };

  const onCellPress = (date) => {
    console.log(date);
  };

  const ondaychange = (val) => {
    setmode(val);
  };

  useEffect(() => {
    Orientation.lockToLandscape();
  },[])

  return (
    <View>
      <View style={styles.viewstyle}>
        <TouchableOpacity
          style={[
            styles.button,
            mode === "day" ? styles.activecolor : styles.inactivecolor
          ]}
          onPress={() => ondaychange("day")}
        >
          <Text style={styles.textstyle}>day</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.button,
            mode === "3days" ? styles.activecolor : styles.inactivecolor
          ]}
          onPress={() => ondaychange("3days")}
        >
          <Text style={styles.textstyle}>3 days</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.button,
            mode === "week" ? styles.activecolor : styles.inactivecolor
          ]}
          onPress={() => ondaychange("week")}
        >
          <Text style={styles.textstyle}>week</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.button,
            mode === "month" ? styles.activecolor : styles.inactivecolor
          ]}
          onPress={() => ondaychange("month")}
        >
          <Text style={styles.textstyle}>month</Text>
        </TouchableOpacity>
      </View>

      <Calendar
        events={events}
        date={"2023-02-11"}
        height={mode === "month" ? 500 : 700}
        mode={mode}
        onPressEvent={(eve) => onEventPress(eve)}
        onPressCell={(date) => onCellPress(date)}
        //activeDate={"2023-02-12"}
      />
    </View>
  );
}

export default Calendardemo;
const styles = StyleSheet.create({
  viewstyle: {
    flexDirection: "row",
    justifyContent: "space-around",
    flex: 1,
    marginVertical: 16
  },
  button: {
    height: 30,
    width: 60,
    alignContent: "center",
    alignItems: "center",

    padding: 5,
    borderRadius: 10
  },
  textstyle: {
    color: "white",
    textAlign: "center",
    fontWeight: "700",
    textTransform: "capitalize"
  },
  activecolor: {
    backgroundColor: "green"
  },
  inactivecolor: {
    backgroundColor: "gray"
  }
});
