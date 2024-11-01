import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';

const App = () => {
  const [city, setCity] = useState('');
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState(null);

  const fetchWeather = async () => {
    const apiKey = 'd48eae81a502e707826c79b90d288bd3'; 
    try {
      const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`);
      
      if (!response.ok) {
        throw new Error('Cidade não encontrada. Tente novamente.');
      }
      
      const data = await response.json();
      setWeatherData(data);
      setError(null);
    } catch (err) {
      setError(err.message);
      setWeatherData(null);
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Digite a cidade"
        value={city}
        onChangeText={setCity}
      />
      <Button title="Buscar Clima" onPress={fetchWeather} />
      {error && <Text style={styles.error}>{error}</Text>}
      {weatherData && (
        <View style={styles.weatherInfo}>
          <Text>Temperatura: {weatherData.main.temp}°C</Text>
          <Text>Condições: {weatherData.weather[0].description}</Text>
          <Text>Cidade: {weatherData.name}</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 16,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    paddingHorizontal: 10,
    marginBottom: 16,
  },
  weatherInfo: {
    marginTop: 16,
  },
  error: {
    color: 'red',
  },
});

export default App;
