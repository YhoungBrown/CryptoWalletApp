import React, { useState } from 'react';
import { Image, ScrollView, Text, View } from 'react-native';

import HeaderBar from '../components/HeaderBar';
import SectionTitle from '../components/SectionTitle';
import Setting from '../components/Setting';
import { COLORS, SIZES, dummyData, icons } from '../constants';
import MainLayout from './MainLayout';

const Profile = () => {

  const [faceId, setFaceId] = useState(true);

  return (
    <MainLayout>
      <View
      style={{
        flex: 1,
        paddingHorizontal: SIZES.padding,
        backgroundColor: COLORS.black,
      }}>
        {/**Header */}
          <HeaderBar 
            title={"Profile"} 
          />
        {/**details */}
        <ScrollView>
          {/**Email and userId section*/}
          <View style={{
            flexDirection:'row',
            marginTop: SIZES.radius,
          }}>
              {/**Email & user Id */}
              <View
                style={{
                flex: 1
                }}
              >
                <Text 
                    style={{
                    color: COLORS.white,
                    fontWeight: '600'
                  }}
                >
                  {dummyData.profile.email}
                </Text>

                <Text style={{
                  color: COLORS.lightGray3,
                  fontWeight: '400',
                }}>ID: {dummyData.profile.id}</Text>
              </View>

              {/**status */}

              <View style={{
                flexDirection: 'row',
                alignItems: 'center',
              }}>
                  <Image 
                    source={icons.verified}
                    style={{
                      height: 25,
                      width: 25,
                    }}
                  />
                  <Text style={{
                    marginLeft: SIZES.base,
                    color: COLORS.lightGreen,
                    fontWeight: '400'}}>verified</Text>
              </View>
          </View>

          {/**App Section */}
          <SectionTitle 
            title="APP"
          />

          <Setting 
            title="Launch Screen"
            value="Home" 
            type="button"
            onPress={() => console.log("Pressed")}
          />
          <Setting 
            title="Appearance"
            value="Dark" 
            type="button"
            onPress={() => console.log("Pressed")}
          />

          {/**Account Section */}

          <SectionTitle 
            title="ACCOUNT"
          />

          <Setting 
            title="Payment Currency"
            value="USD" 
            type="button"
            onPress={() => console.log("Pressed")}
          />
          <Setting 
            title="Language"
            value="English" 
            type="button"
            onPress={() => console.log("Pressed")}
          />

          {/**Security section */}
          <SectionTitle 
            title="SECURITY"
          />

          <Setting 
            title="Face ID"
            value={faceId}
            type="switch"
            onPress={(value) => setFaceId(value)}
          />
          <Setting 
            title="Password Settings"
            value="" 
            type="button"
            onPress={() => console.log("Pressed")}
          />
          <Setting 
            title="Change Password"
            value="" 
            type="button"
            onPress={() => console.log("Pressed")}
          />
          <Setting 
            title="2-Factor Authentication"
            value="" 
            type="button"
            onPress={() => console.log("Pressed")}
          />
        </ScrollView>
      </View>
    </MainLayout>
  )
}

export default Profile