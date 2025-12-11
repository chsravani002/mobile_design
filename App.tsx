// import React from "react";
// import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity, Image } from "react-native";
// import { Formik } from "formik";
// import * as Yup from "yup";

// const validationSchema = Yup.object().shape({
//   email: Yup.string().email("Invalid email").required("Email is required"),
//   password: Yup.string().required("Password is required"),
// });

// export default function App() {
//    return (
//     <View style={styles.container}>
//       {/* Logo */}
//       <Text style={styles.logo}>Hello</Text>

//       <Text style={styles.welcome}>Welcome!</Text>

//       <Formik
//         initialValues={{ email: "", password: "" }}
//         validationSchema={validationSchema}
//         onSubmit={(values) => console.log("Form:", values)}
//       >
//         {({
//           handleChange,
//           handleBlur,
//           handleSubmit,
//           values,
//           errors,
//           touched,
//         }) => (
//           <>
//             {/* Email */}
//             <TextInput
//               style={styles.input}
//               placeholder="Email"
//               placeholderTextColor="#999"
//               onChangeText={handleChange("email")}
//               onBlur={handleBlur("email")}
//               value={values.email}
//             />
//             {touched.email && errors.email && (
//               <Text style={styles.error}>{errors.email}</Text>
//             )}

//             {/* Password */}
//             <TextInput
//               style={styles.input}
//               placeholder="Password"
//               placeholderTextColor="#999"
//               secureTextEntry
//               onChangeText={handleChange("password")}
//               onBlur={handleBlur("password")}
//               value={values.password}
//             />
//             {touched.password && errors.password && (
//               <Text style={styles.error}>{errors.password}</Text>
//             )}

//             {/* Login Button */}
//             <TouchableOpacity style={styles.loginBtn} onPress={handleSubmit}>
//               <Text style={styles.loginText}>Login</Text>
//             </TouchableOpacity>

//             {/* Forgot Password */}
//             <TouchableOpacity>
//               <Text style={styles.forgot}>Forgot password?</Text>
//             </TouchableOpacity>

//             {/* Social Login */}
//             <View style={styles.socialContainer}>
//               <TouchableOpacity style={styles.socialBtn}>
//                 <Image
//                   source={require("/assets/Google__G__logo.svg.png")}
//                   style={styles.socialIcon}
//                 />
//                 <Text style={styles.socialText}>Google</Text>
//               </TouchableOpacity>

//               <TouchableOpacity style={styles.socialBtn}>
//                 <Image
//                   source={require("./assets/facebook.png")}
//                   style={styles.socialIcon}
//                 />
//                 <Text style={styles.socialText}>Facebook</Text>
//               </TouchableOpacity>
//             </View>

//             {/* Sign Up Link */}
//             <Text style={styles.signupText}>
//               Don’t have an account?{" "}
//               <Text style={styles.signupLink}>Sign Up</Text>
//             </Text>
//           </>
//         )}
//       </Formik>

//       {/* Bottom Decorative Design */}
//       <View style={styles.bottomCircle1} />
//       <View style={styles.bottomCircle2} />
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     padding: 25,
//     backgroundColor: "#fff",
//     justifyContent: "center",
//   },

//   logo: {
//     fontSize: 34,
//     color: "#ff6b3d",
//     fontWeight: "700",
//     marginBottom: 10,
//     alignSelf: "center",
//   },

//   welcome: {
//     fontSize: 24,
//     fontWeight: "600",
//     marginBottom: 25,
//   },

//   input: {
//     width: "100%",
//     backgroundColor: "#F3F3F3",
//     padding: 14,
//     borderRadius: 12,
//     marginBottom: 10,
//     fontSize: 16,
//   },

//   error: {
//     color: "red",
//     marginBottom: 10,
//     marginLeft: 4,
//     fontSize: 13,
//   },

//   loginBtn: {
//     backgroundColor: "#ff6b3d",
//     paddingVertical: 14,
//     borderRadius: 12,
//     alignItems: "center",
//     marginTop: 10,
//   },

//   loginText: {
//     color: "#fff",
//     fontWeight: "600",
//     fontSize: 18,
//   },

//   forgot: {
//     textAlign: "center",
//     color: "#ff6b3d",
//     marginTop: 10,
//   },

//   socialContainer: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     marginTop: 25,
//   },

//   socialBtn: {
//     width: "48%",
//     flexDirection: "row",
//     alignItems: "center",
//     borderWidth: 1,
//     borderColor: "#ddd",
//     padding: 12,
//     borderRadius: 12,
//     justifyContent: "center",
//     gap: 8,
//   },

//   socialIcon: { width: 20, height: 20 },

//   socialText: { fontSize: 16, fontWeight: "500" },

//   signupText: {
//     marginTop: 20,
//     textAlign: "center",
//     color: "#777",
//   },

//   signupLink: {
//     color: "#ff6b3d",
//     fontWeight: "600",
//   },

//   bottomCircle1: {
//     width: 200,
//     height: 200,
//     backgroundColor: "#ffe4d6",
//     position: "absolute",
//     bottom: -50,
//     right: -40,
//     borderRadius: 200,
//   },

//   bottomCircle2: {
//     width: 130,
//     height: 130,
//     backgroundColor: "#ffefe7",
//     position: "absolute",
//     bottom: -30,
//     left: -20,
//     borderRadius: 200,
//   },
// });


import React, { useState } from "react";
import {
  View,
  Button,
  Image,
  Text,
  PermissionsAndroid,
  Platform,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { launchCamera, launchImageLibrary } from "react-native-image-picker";

export default function App() {
  const [imageUri, setImageUri] = useState<string | null>(null);

  const requestCameraPermission = async () => {
    if (Platform.OS === "ios") return true;

    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.CAMERA,
        {
          title: "Camera Permission",
          message: "This app needs access to your camera",
          buttonPositive: "OK",
        }
      );

      return granted === PermissionsAndroid.RESULTS.GRANTED;
    } catch (err) {
      return false;
    }
  };

  const openCamera = async () => {
    const hasPermission = await requestCameraPermission();
    if (!hasPermission) {
      console.log("Camera permission denied");
      return;
    }

    launchCamera(
      {
        mediaType: "photo",
        cameraType: "back",
      },
      (response) => {
        if (response.didCancel) return;

        const uri = response.assets?.[0]?.uri || null;
        setImageUri(uri);
      }
    );
  };

  const openGallery = () => {
    launchImageLibrary(
      {
        mediaType: "photo",
      },
      (response) => {
        if (response.didCancel) return;

        const uri = response.assets?.[0]?.uri || null;
        setImageUri(uri);
      }
    );
  };

  return (
    < SafeAreaView  >
      <Button title="Open Camera" onPress={openCamera} />

      <View style={{ marginTop: 10 }} />

      <Button title="Pick from Gallery" onPress={openGallery} />

      {imageUri ? (
        <Image
          source={{ uri: imageUri }}
          style={{
            width: 200,
            height: 200,
            marginTop: 20,
            borderRadius: 10,
            alignSelf: "center",
          }}
        />
      ) : (
        <Text
          style={{
            marginTop: 20,
            textAlign: "center",
            color: "black",
          }}
        >
          No image selected
        </Text>
      )}
    </ SafeAreaView >
  );
}