import React, {useEffect, useState} from "react";
import { View, Text, StyleSheet, ActivityIndicator, TextInput} from "react-native";
import HavaKartı from "./component/HavaKarti";
const API_KEY = "f03a88bc53f5944dafd61df1c2ab5de3";

export default function App(){
  const[sehir, setSehir] = useState("Antalya"); 
  const[hava, setHava]= useState<any>(null);
  const[yukleniyor, setYukleniyor] = useState(true);

//useEffect: bileşen yüklendiğinde ve şehir değiştiğinde çalışır
useEffect(() => {
  async function veriCek() {
    try {
      setYukleniyor(true);
      const cevap = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${sehir}&appid=${API_KEY}&lang=tr&units=metric`

      );
      const data = await cevap.json();
      setHava(data);
    } catch (hata) {
      console.error("Veri çekme hatası: ",hata);
    } finally {
      setYukleniyor(false);
    }
  }
  veriCek();
}, [sehir]); //sehir değişirse yeniden API çağrısı yap.

return (
  <View style={stiller.kapsayici}>
    <Text style={stiller.baslik}>Hava Durumu Uygulaması</Text>
    <TextInput
    style={stiller.input}
    placeholder="Şehir adı giriniz..."
    placeholderTextColor="#999"
    onSubmitEditing={(veri) =>
      setSehir(veri.nativeEvent.text)
    }
    returnKeyType="search"/>
    {yukleniyor ?(
      <ActivityIndicator size="large" color="#007AFF"/>
    ): hava && hava.weather ? (
      <HavaKartı
      sehir={hava.name}
      sicaklik={hava.main.temp}
      durum={hava.weather[0].description}
      ikon={hava.weather[0].icon}
      />
    ):(
      <Text style={stiller.hataMetni}>Veri alınamadı, şehir bulunamadı. </Text>
    )}
  </View>
);
    }




const stiller = StyleSheet.create({
  kapsayici: {
    flex: 1,                          // Tüm ekranı kaplar
    backgroundColor: "#e8f0ff",       // Açık mavi arka plan
    alignItems: "center",             // İçeriği ortala (yatay)
    justifyContent: "flex-start",     // Üstten başla (dikey)
    paddingTop: 80,                   // Üstten 80px boşluk
    paddingHorizontal: 20,            // Yanlardan 20px boşluk
  },
  baslik: {
    fontSize: 22,                     // Yazı boyutu 22px
    fontWeight: "700",                // Kalın (bold)
    color: "#333",                    // Koyu gri renk
    marginBottom: 20,                 // Altından 20px boşluk
  },
  input: {
    backgroundColor: "#fff",          // Beyaz input arka plan
    width: "100%",                    // Tam genişlik
    borderRadius: 10,                 // Köşeleri 10px yuvarla
    paddingHorizontal: 16,            // Yanlardan 16px iç boşluk
    paddingVertical: 10,              // Üst-alt 10px iç boşluk
    fontSize: 16,                     // Yazı boyutu 16px
    marginBottom: 20,                 // Altından 20px boşluk
    shadowColor: "#000",              // Gölge rengi siyah
    shadowOpacity: 0.1,               // Gölge şeffaflığı %10
    shadowOffset: { width: 0, height: 3 }, // Gölge 3px aşağı
    shadowRadius: 5,                  // Gölge yayılma 5px
    elevation: 3,                     // Android gölge seviyesi 3
  },
  hataMetni: {
    color: "#ff3b30",                 // Kırmızı hata rengi
    fontSize: 16,                     // Yazı boyutu 16px
    marginTop: 20,                    // Üstünden 20px boşluk
  },
});