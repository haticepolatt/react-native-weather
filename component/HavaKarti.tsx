import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";

//Props tipi tanımı
type HavaKartiProps = {
    sehir: string;
    sicaklik: number;
    durum: string;
    ikon: string;
};

//function kullanımıyla modern bileşen
export default function HavaKartı ({sehir, sicaklik, durum, ikon}:
    HavaKartiProps) {
        const ikonUrl =`https://openweathermap.org/img/wn/${ikon}@4x.png`;

        return (
            <View style = {stiller.kart}>
                <Text style={stiller.sehirMetni}>{sehir}</Text>
                <Image source={{uri: ikonUrl}} style={stiller.ikon}/>
                <Text style={stiller.sicaklikMetni}>{Math.round(sicaklik)}°C</Text>
                <Text style={stiller.durumMetni}>{durum}</Text>
            </View>
        )
    }
    const stiller = StyleSheet.create({
        kart: {
          backgroundColor: "#fff",           // Kartın arka plan rengi: beyaz
          borderRadius: 16,                  // Köşeleri yuvarlatılmış (16px)
          padding: 20,                       // İç boşluk (tüm yönler 20px)
          alignItems: "center",              // İçerikleri yatayda ortala
          shadowColor: "#000",               // Gölge rengi: siyah
          shadowOpacity: 0.15,               // Gölge opaklığı (%15)
          shadowOffset: { width: 0, height: 5 }, // Gölge konumu: aşağıda 5px
          shadowRadius: 10,                  // Gölge yumuşaklığı (bulanıklık)
          elevation: 5,                      // Android için gölge derinliği
          width: "100%",                     // Kart genişliği: ekranın tamamı
        },
        sehirMetni: {
          fontSize: 22,                      // Şehir adı yazı boyutu
          fontWeight: "700",                 // Kalın yazı (bold)
          color: "#007AFF",                  // Mavi renk (Apple mavi tonu)
          marginBottom: 10,                  // Alt boşluk: 10px
        },
        ikon: {
          width: 120,                        // Hava durumu ikon genişliği
          height: 120,                       // Hava durumu ikon yüksekliği
        },
        sicaklikMetni: {
          fontSize: 48,                      // Sıcaklık değeri yazı boyutu (büyük)
          fontWeight: "bold",                // Çok kalın yazı
          color: "#333",                     // Koyu gri renk
          marginVertical: 10,                // Üst ve alt boşluk: 10px
        },
        durumMetni: {
          fontSize: 18,                      // Hava durumu açıklaması yazı boyutu
          fontWeight: "500",                 // Orta kalınlıkta yazı
          color: "#666",                     // Açık gri renk
          textTransform: "capitalize",       // Her kelimenin ilk harfi büyük (örn: "parçalı bulutlu")
        },
      });