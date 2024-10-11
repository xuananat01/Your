import React from 'react';
import {StyleSheet, View, TouchableOpacity, Text} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import DateTimePickerModal from "react-native-modal-datetime-picker";

const Location = ({item, weather: {temp, description}}) => {
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (date) => {
    console.warn("A date has been picked: ", date);
    hideDatePicker();
  };
  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['#e6f4f7', '#cde9ee', '#b3dfe6']}
        style={styles.linear}>
        <TouchableOpacity style={{flexDirection: 'row'}}>
          <Text style={styles.txtInfoweather}>{item}</Text>
          <Text style={styles.tempweather}>{temp.toFixed()}</Text>
          <Text style={styles.description}>{description}</Text>
        </TouchableOpacity>
      </LinearGradient>
      <Button title="showDatePicker" onPress={showDatePicker} />
      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="date"
        onConfirm={handleConfirm}
        onCancel={hideDatePicker}
      />
    </View>
  );
};

export default Location;

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flex: 1,
  },
  txtInfoweather: {
    padding: 20,
    fontSize: 18,
    fontWeight: '500',
  },
  tempweather: {
    fontSize: 22,
    position: 'absolute',
    top: 15,
    right: 60,
    color: '#566e72',
  },
  description: {
    fontSize: 16,
    position: 'absolute',
    top: 50,
    right: 50,
    color: '#566e72',
  },
  linear: {
    height: 90,
    marginTop: 20,
    borderRadius: 20,
  },
});
