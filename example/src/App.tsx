import * as React from 'react';

import { createPdf, ImageFit, Page } from 'react-native-images-to-pdf';
import { launchImageLibrary } from 'react-native-image-picker';
import RNBlobUtil from 'react-native-blob-util';
import Pdf from 'react-native-pdf';
import ViewShot from 'react-native-view-shot';
import {
  Button,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  ScrollView,
  Image,
} from 'react-native';
import ImageEditor from '@react-native-community/image-editor';
import img from './assets/image.jpg';

export default function App() {
  const [uri, setUri] = React.useState('');
  const [isLoading, setIsLoading] = React.useState(false);
  const [width, setWidth] = React.useState<number | undefined>(500);
  const [height, setHeight] = React.useState<number | undefined>(800);
  const [backgroundColor, setBackgroundColor] = React.useState('black');
  const [imageFit, setImageFit] = React.useState<ImageFit | undefined>(
    'contain'
  );

  const ref = React.useRef<any>(null);

  const parts: string[] = [];
  if (width) {
    parts.push(`${width}w`);
  }
  if (height) {
    parts.push(`${height}h`);
  }
  parts.push(imageFit ?? 'none');

  const outputFilename = parts.join('-') + '.pdf';

  const selectImages = async () => {
    setIsLoading(true);

    try {
      const result = await launchImageLibrary({
        mediaType: 'photo',
        selectionLimit: 0,
      });

      if (result.assets) {
        const pages: Page[] = [];

        for (let asset of result.assets) {
          const uri = asset.uri as string;

          // const mimeType = asset.type as string;
          //
          // const base64 = await RNBlobUtil.fs.readFile(
          //   uri.replace('file://', ''),
          //   'base64'
          // );
          //
          // const imagePath = `data:${mimeType};base64,${base64}`;

          pages.push({
            imagePath: uri,
            imageFit,
            // width,
            // height,
            backgroundColor,
          });
        }

        const uri = await createPdf({
          outputPath: `file://${RNBlobUtil.fs.dirs.DocumentDir}/${outputFilename}`,
          pages,
        });
        console.log('PDF created successfully:', uri);
        setUri(uri);
      }
    } catch (e) {
      console.error('Failed to create PDF:', e);
    }
    setIsLoading(false);
  };

  // if (uri) {
  //   return (
  //     <View style={{ flex: 1, backgroundColor: 'white' }}>
  //       <Pdf
  //         style={{ flex: 1 }}
  //         onError={console.error}
  //         source={{
  //           uri,
  //         }}
  //       />
  //       <TouchableOpacity
  //         style={[
  //           styles.button,
  //           {
  //             margin: 20,
  //           },
  //         ]}
  //         disabled={isLoading}
  //         onPress={() => setUri('')}
  //       >
  //         <Text style={styles.buttonText}>Close</Text>
  //       </TouchableOpacity>
  //     </View>
  //   );
  // }

  const handleCapture = async () => {
    const res = await ref.current.capture();

    if (res) {
      Image.getSize(`file://${res}`, (width, height) => {
        console.log('width, height', width, height);
      });

      ImageEditor.cropImage(`file://${res}`, {
        offset: { x: 0, y: 0 },
        size: { width: 200, height: 200 },
        displaySize: { width: 200, height: 200 },
        resizeMode: 'contain',
      })
        .then((url) => {
          // console.log('Cropped image uri', url);
          // In case of Web, the `url` is the base64 string
        })
        .catch((error) => {
          console.log('errrrr', error);
        });
    }

    if (res) {
      const result = await createPdf({
        outputPath: `file://${RNBlobUtil.fs.dirs.DocumentDir}/${outputFilename}`,
        pages: [
          {
            imagePath: `file://${res}`,
            imageFit,
            width: 2050,
            height: 3500,
            backgroundColor,
          },
        ],
      });
      ~console.log('PDF created successfully:', result);
      setUri(uri);
    }
  };

  return (
    <View style={{ padding: 20 }}>
      <View style={{ marginBottom: 20 }}>
        <Button
          title="print"
          onPress={() => {
            handleCapture();
          }}
        />
      </View>
      <ScrollView>
        <ViewShot
          options={{
            fileName: 'page1',
            format: 'jpg',
            quality: 1,
            width: 2550,
            useRenderInContext: true,
          }}
          ref={ref}
        >
          <View style={{ backgroundColor: 'red', height: 1000 }}>
            <Text style={{ fontSize: 30, padding: 20, marginBottom: 20 }}>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Vero at
              quis mollitia repellat nisi quisquam ducimus provident eos, nam,
              totam ipsum culpa deleniti aliquam explicabo qui delectus omnis
              veniam? Nemo.
            </Text>
            <Text style={{ fontSize: 30, padding: 20, marginBottom: 20 }}>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Vero at
              quis mollitia repellat nisi quisquam ducimus provident eos, nam,
              totam ipsum culpa deleniti aliquam explicabo qui delectus omnis
              veniam? Nemo.
            </Text>
            <Text style={{ fontSize: 30, padding: 20, marginBottom: 20 }}>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Vero at
              quis mollitia repellat nisi quisquam ducimus provident eos, nam,
              totam ipsum culpa deleniti aliquam explicabo qui delectus omnis
              veniam? Nemo.
            </Text>
            <Text style={{ fontSize: 30, padding: 20, marginBottom: 20 }}>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Vero at
              quis mollitia repellat nisi quisquam ducimus provident eos, nam,
              totam ipsum culpa deleniti aliquam explicabo qui delectus omnis
              veniam? Nemo.
            </Text>
          </View>
          <View style={{ backgroundColor: 'blue', height: 1000 }}>
            <Text style={{ fontSize: 30, padding: 20, marginBottom: 20 }}>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Vero at
              quis mollitia repellat nisi quisquam ducimus provident eos, nam,
              totam ipsum culpa deleniti aliquam explicabo qui delectus omnis
              veniam? Nemo.
            </Text>
            <Text style={{ fontSize: 30, padding: 20, marginBottom: 20 }}>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Vero at
              quis mollitia repellat nisi quisquam ducimus provident eos, nam,
              totam ipsum culpa deleniti aliquam explicabo qui delectus omnis
              veniam? Nemo.
            </Text>
            <Text style={{ fontSize: 30, padding: 20, marginBottom: 20 }}>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Vero at
              quis mollitia repellat nisi quisquam ducimus provident eos, nam,
              totam ipsum culpa deleniti aliquam explicabo qui delectus omnis
              veniam? Nemo.
            </Text>
            <Text style={{ fontSize: 30, padding: 20, marginBottom: 20 }}>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Vero at
              quis mollitia repellat nisi quisquam ducimus provident eos, nam,
              totam ipsum culpa deleniti aliquam explicabo qui delectus omnis
              veniam? Nemo.
            </Text>
          </View>
          <View style={{ backgroundColor: 'blue', height: 1000 }}>
            <Text style={{ fontSize: 30, padding: 20, marginBottom: 20 }}>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Vero at
              quis mollitia repellat nisi quisquam ducimus provident eos, nam,
              totam ipsum culpa deleniti aliquam explicabo qui delectus omnis
              veniam? Nemo.
            </Text>
            <Text style={{ fontSize: 30, padding: 20, marginBottom: 20 }}>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Vero at
              quis mollitia repellat nisi quisquam ducimus provident eos, nam,
              totam ipsum culpa deleniti aliquam explicabo qui delectus omnis
              veniam? Nemo.
            </Text>
            <Text style={{ fontSize: 30, padding: 20, marginBottom: 20 }}>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Vero at
              quis mollitia repellat nisi quisquam ducimus provident eos, nam,
              totam ipsum culpa deleniti aliquam explicabo qui delectus omnis
              veniam? Nemo.
            </Text>
            <Text style={{ fontSize: 30, padding: 20, marginBottom: 20 }}>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Vero at
              quis mollitia repellat nisi quisquam ducimus provident eos, nam,
              totam ipsum culpa deleniti aliquam explicabo qui delectus omnis
              veniam? Nemo.
            </Text>
            <Text style={{ fontSize: 30, padding: 20, marginBottom: 20 }}>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Vero at
              quis mollitia repellat nisi quisquam ducimus provident eos, nam,
              totam ipsum culpa deleniti aliquam explicabo qui delectus omnis
              veniam? Nemo.
            </Text>
            <Text style={{ fontSize: 30, padding: 20, marginBottom: 20 }}>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Vero at
              quis mollitia repellat nisi quisquam ducimus provident eos, nam,
              totam ipsum culpa deleniti aliquam explicabo qui delectus omnis
              veniam? Nemo.
            </Text>
            <Text style={{ fontSize: 30, padding: 20, marginBottom: 20 }}>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Vero at
              quis mollitia repellat nisi quisquam ducimus provident eos, nam,
              totam ipsum culpa deleniti aliquam explicabo qui delectus omnis
              veniam? Nemo.
            </Text>
            <Text style={{ fontSize: 30, padding: 20, marginBottom: 20 }}>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Vero at
              quis mollitia repellat nisi quisquam ducimus provident eos, nam,
              totam ipsum culpa deleniti aliquam explicabo qui delectus omnis
              veniam? Nemo.
            </Text>
            <Text style={{ fontSize: 30, padding: 20, marginBottom: 20 }}>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Vero at
              quis mollitia repellat nisi quisquam ducimus provident eos, nam,
              totam ipsum culpa deleniti aliquam explicabo qui delectus omnis
              veniam? Nemo.
            </Text>
            <Text style={{ fontSize: 30, padding: 20, marginBottom: 20 }}>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Vero at
              quis mollitia repellat nisi quisquam ducimus provident eos, nam,
              totam ipsum culpa deleniti aliquam explicabo qui delectus omnis
              veniam? Nemo.
            </Text>
            <Text style={{ fontSize: 30, padding: 20, marginBottom: 20 }}>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Vero at
              quis mollitia repellat nisi quisquam ducimus provident eos, nam,
              totam ipsum culpa deleniti aliquam explicabo qui delectus omnis
              veniam? Nemo.
            </Text>
            <Text style={{ fontSize: 30, padding: 20, marginBottom: 20 }}>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Vero at
              quis mollitia repellat nisi quisquam ducimus provident eos, nam,
              totam ipsum culpa deleniti aliquam explicabo qui delectus omnis
              veniam? Nemo.
            </Text>
            <Text style={{ fontSize: 30, padding: 20, marginBottom: 20 }}>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Vero at
              quis mollitia repellat nisi quisquam ducimus provident eos, nam,
              totam ipsum culpa deleniti aliquam explicabo qui delectus omnis
              veniam? Nemo.
            </Text>
            <Text style={{ fontSize: 30, padding: 20, marginBottom: 20 }}>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Vero at
              quis mollitia repellat nisi quisquam ducimus provident eos, nam,
              totam ipsum culpa deleniti aliquam explicabo qui delectus omnis
              veniam? Nemo.
            </Text>
            <Text style={{ fontSize: 30, padding: 20, marginBottom: 20 }}>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Vero at
              quis mollitia repellat nisi quisquam ducimus provident eos, nam,
              totam ipsum culpa deleniti aliquam explicabo qui delectus omnis
              veniam? Nemo.
            </Text>
            <Text style={{ fontSize: 30, padding: 20, marginBottom: 20 }}>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Vero at
              quis mollitia repellat nisi quisquam ducimus provident eos, nam,
              totam ipsum culpa deleniti aliquam explicabo qui delectus omnis
              veniam? Nemo.
            </Text>
          </View>
          <View style={{ backgroundColor: 'green', height: 1000 }}>
            <Text>Page 2</Text>
            <Text style={{ fontSize: 30, padding: 20, marginBottom: 20 }}>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Vero at
              quis mollitia repellat nisi quisquam ducimus provident eos, nam,
              totam ipsum culpa deleniti aliquam explicabo qui delectus omnis
              veniam? Nemo.
            </Text>
            <Text style={{ fontSize: 30, padding: 20, marginBottom: 20 }}>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Vero at
              quis mollitia repellat nisi quisquam ducimus provident eos, nam,
              totam ipsum culpa deleniti aliquam explicabo qui delectus omnis
              veniam? Nemo.
            </Text>
            <Text style={{ fontSize: 30, padding: 20, marginBottom: 20 }}>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Vero at
              quis mollitia repellat nisi quisquam ducimus provident eos, nam,
              totam ipsum culpa deleniti aliquam explicabo qui delectus omnis
              veniam? Nemo.
            </Text>
            <Text style={{ fontSize: 30, padding: 20, marginBottom: 20 }}>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Vero at
              quis mollitia repellat nisi quisquam ducimus provident eos, nam,
              totam ipsum culpa deleniti aliquam explicabo qui delectus omnis
              veniam? Nemo.
            </Text>
            <Text style={{ fontSize: 30, padding: 20, marginBottom: 20 }}>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Vero at
              quis mollitia repellat nisi quisquam ducimus provident eos, nam,
              totam ipsum culpa deleniti aliquam explicabo qui delectus omnis
              veniam? Nemo.
            </Text>
            <Text style={{ fontSize: 30, padding: 20, marginBottom: 20 }}>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Vero at
              quis mollitia repellat nisi quisquam ducimus provident eos, nam,
              totam ipsum culpa deleniti aliquam explicabo qui delectus omnis
              veniam? Nemo.
            </Text>
            <Text style={{ fontSize: 30, padding: 20, marginBottom: 20 }}>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Vero at
              quis mollitia repellat nisi quisquam ducimus provident eos, nam,
              totam ipsum culpa deleniti aliquam explicabo qui delectus omnis
              veniam? Nemo.
            </Text>
            <Text style={{ fontSize: 30, padding: 20, marginBottom: 20 }}>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Vero at
              quis mollitia repellat nisi quisquam ducimus provident eos, nam,
              totam ipsum culpa deleniti aliquam explicabo qui delectus omnis
              veniam? Nemo.
            </Text>
          </View>

          <View style={{ backgroundColor: 'red', height: 1000 }}>
            <Text>Page 5</Text>
            <Text style={{ fontSize: 30, padding: 20, marginBottom: 20 }}>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Vero at
              quis mollitia repellat nisi quisquam ducimus provident eos, nam,
              totam ipsum culpa deleniti aliquam explicabo qui delectus omnis
              veniam? Nemo.
            </Text>
            <Text style={{ fontSize: 30, padding: 20, marginBottom: 20 }}>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Vero at
              quis mollitia repellat nisi quisquam ducimus provident eos, nam,
              totam ipsum culpa deleniti aliquam explicabo qui delectus omnis
              veniam? Nemo.
            </Text>
            <Text style={{ fontSize: 30, padding: 20, marginBottom: 20 }}>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Vero at
              quis mollitia repellat nisi quisquam ducimus provident eos, nam,
              totam ipsum culpa deleniti aliquam explicabo qui delectus omnis
              veniam? Nemo.
            </Text>
            <Text style={{ fontSize: 30, padding: 20, marginBottom: 20 }}>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Vero at
              quis mollitia repellat nisi quisquam ducimus provident eos, nam,
              totam ipsum culpa deleniti aliquam explicabo qui delectus omnis
              veniam? Nemo.
            </Text>
            <Text style={{ fontSize: 30, padding: 20, marginBottom: 20 }}>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Vero at
              quis mollitia repellat nisi quisquam ducimus provident eos, nam,
              totam ipsum culpa deleniti aliquam explicabo qui delectus omnis
              veniam? Nemo.
            </Text>
            <Text style={{ fontSize: 30, padding: 20, marginBottom: 20 }}>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Vero at
              quis mollitia repellat nisi quisquam ducimus provident eos, nam,
              totam ipsum culpa deleniti aliquam explicabo qui delectus omnis
              veniam? Nemo.
            </Text>
            <Text style={{ fontSize: 30, padding: 20, marginBottom: 20 }}>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Vero at
              quis mollitia repellat nisi quisquam ducimus provident eos, nam,
              totam ipsum culpa deleniti aliquam explicabo qui delectus omnis
              veniam? Nemo.
            </Text>
            <Text style={{ fontSize: 30, padding: 20, marginBottom: 20 }}>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Vero at
              quis mollitia repellat nisi quisquam ducimus provident eos, nam,
              totam ipsum culpa deleniti aliquam explicabo qui delectus omnis
              veniam? Nemo.
            </Text>
          </View>
          <View style={{ backgroundColor: 'orange', height: 1000 }}>
            <Text>Page 7</Text>
            <Text style={{ fontSize: 30, padding: 20, marginBottom: 20 }}>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Vero at
              quis mollitia repellat nisi quisquam ducimus provident eos, nam,
              totam ipsum culpa deleniti aliquam explicabo qui delectus omnis
              veniam? Nemo.
            </Text>
            <Text style={{ fontSize: 30, padding: 20, marginBottom: 20 }}>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Vero at
              quis mollitia repellat nisi quisquam ducimus provident eos, nam,
              totam ipsum culpa deleniti aliquam explicabo qui delectus omnis
              veniam? Nemo.
            </Text>
            <Text style={{ fontSize: 30, padding: 20, marginBottom: 20 }}>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Vero at
              quis mollitia repellat nisi quisquam ducimus provident eos, nam,
              totam ipsum culpa deleniti aliquam explicabo qui delectus omnis
              veniam? Nemo.
            </Text>
            <Text style={{ fontSize: 30, padding: 20, marginBottom: 20 }}>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Vero at
              quis mollitia repellat nisi quisquam ducimus provident eos, nam,
              totam ipsum culpa deleniti aliquam explicabo qui delectus omnis
              veniam? Nemo.
            </Text>
            <Text style={{ fontSize: 30, padding: 20, marginBottom: 20 }}>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Vero at
              quis mollitia repellat nisi quisquam ducimus provident eos, nam,
              totam ipsum culpa deleniti aliquam explicabo qui delectus omnis
              veniam? Nemo.
            </Text>
            <Text style={{ fontSize: 30, padding: 20, marginBottom: 20 }}>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Vero at
              quis mollitia repellat nisi quisquam ducimus provident eos, nam,
              totam ipsum culpa deleniti aliquam explicabo qui delectus omnis
              veniam? Nemo.
            </Text>
            <Text style={{ fontSize: 30, padding: 20, marginBottom: 20 }}>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Vero at
              quis mollitia repellat nisi quisquam ducimus provident eos, nam,
              totam ipsum culpa deleniti aliquam explicabo qui delectus omnis
              veniam? Nemo.
            </Text>
            <Text style={{ fontSize: 30, padding: 20, marginBottom: 20 }}>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Vero at
              quis mollitia repellat nisi quisquam ducimus provident eos, nam,
              totam ipsum culpa deleniti aliquam explicabo qui delectus omnis
              veniam? Nemo.
            </Text>
          </View>
          <View style={{ backgroundColor: 'blue', height: 1000 }}>
            <Text>Page 22</Text>
            <Text style={{ fontSize: 30, padding: 20, marginBottom: 20 }}>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Vero at
              quis mollitia repellat nisi quisquam ducimus provident eos, nam,
              totam ipsum culpa deleniti aliquam explicabo qui delectus omnis
              veniam? Nemo.
            </Text>
            <Text style={{ fontSize: 30, padding: 20, marginBottom: 20 }}>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Vero at
              quis mollitia repellat nisi quisquam ducimus provident eos, nam,
              totam ipsum culpa deleniti aliquam explicabo qui delectus omnis
              veniam? Nemo.
            </Text>
            <Text style={{ fontSize: 30, padding: 20, marginBottom: 20 }}>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Vero at
              quis mollitia repellat nisi quisquam ducimus provident eos, nam,
              totam ipsum culpa deleniti aliquam explicabo qui delectus omnis
              veniam? Nemo.
            </Text>
            <Text style={{ fontSize: 30, padding: 20, marginBottom: 20 }}>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Vero at
              quis mollitia repellat nisi quisquam ducimus provident eos, nam,
              totam ipsum culpa deleniti aliquam explicabo qui delectus omnis
              veniam? Nemo.
            </Text>
            <Text style={{ fontSize: 30, padding: 20, marginBottom: 20 }}>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Vero at
              quis mollitia repellat nisi quisquam ducimus provident eos, nam,
              totam ipsum culpa deleniti aliquam explicabo qui delectus omnis
              veniam? Nemo.
            </Text>
            <Text style={{ fontSize: 30, padding: 20, marginBottom: 20 }}>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Vero at
              quis mollitia repellat nisi quisquam ducimus provident eos, nam,
              totam ipsum culpa deleniti aliquam explicabo qui delectus omnis
              veniam? Nemo.
            </Text>
            <Text style={{ fontSize: 30, padding: 20, marginBottom: 20 }}>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Vero at
              quis mollitia repellat nisi quisquam ducimus provident eos, nam,
              totam ipsum culpa deleniti aliquam explicabo qui delectus omnis
              veniam? Nemo.
            </Text>
            <Text style={{ fontSize: 30, padding: 20, marginBottom: 20 }}>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Vero at
              quis mollitia repellat nisi quisquam ducimus provident eos, nam,
              totam ipsum culpa deleniti aliquam explicabo qui delectus omnis
              veniam? Nemo.
            </Text>
          </View>
          <View style={{ backgroundColor: 'red', height: 1000 }}>
            <Text>Page 2</Text>
            <Text style={{ fontSize: 30, padding: 20, marginBottom: 20 }}>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Vero at
              quis mollitia repellat nisi quisquam ducimus provident eos, nam,
              totam ipsum culpa deleniti aliquam explicabo qui delectus omnis
              veniam? Nemo.
            </Text>
            <Text style={{ fontSize: 30, padding: 20, marginBottom: 20 }}>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Vero at
              quis mollitia repellat nisi quisquam ducimus provident eos, nam,
              totam ipsum culpa deleniti aliquam explicabo qui delectus omnis
              veniam? Nemo.
            </Text>
            <Text style={{ fontSize: 30, padding: 20, marginBottom: 20 }}>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Vero at
              quis mollitia repellat nisi quisquam ducimus provident eos, nam,
              totam ipsum culpa deleniti aliquam explicabo qui delectus omnis
              veniam? Nemo.
            </Text>
            <Text style={{ fontSize: 30, padding: 20, marginBottom: 20 }}>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Vero at
              quis mollitia repellat nisi quisquam ducimus provident eos, nam,
              totam ipsum culpa deleniti aliquam explicabo qui delectus omnis
              veniam? Nemo.
            </Text>
            <Text style={{ fontSize: 30, padding: 20, marginBottom: 20 }}>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Vero at
              quis mollitia repellat nisi quisquam ducimus provident eos, nam,
              totam ipsum culpa deleniti aliquam explicabo qui delectus omnis
              veniam? Nemo.
            </Text>
            <Text style={{ fontSize: 30, padding: 20, marginBottom: 20 }}>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Vero at
              quis mollitia repellat nisi quisquam ducimus provident eos, nam,
              totam ipsum culpa deleniti aliquam explicabo qui delectus omnis
              veniam? Nemo.
            </Text>
            <Text style={{ fontSize: 30, padding: 20, marginBottom: 20 }}>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Vero at
              quis mollitia repellat nisi quisquam ducimus provident eos, nam,
              totam ipsum culpa deleniti aliquam explicabo qui delectus omnis
              veniam? Nemo.
            </Text>
            <Text style={{ fontSize: 30, padding: 20, marginBottom: 20 }}>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Vero at
              quis mollitia repellat nisi quisquam ducimus provident eos, nam,
              totam ipsum culpa deleniti aliquam explicabo qui delectus omnis
              veniam? Nemo.
            </Text>
          </View>
          <View style={{ backgroundColor: 'yellow', height: 1000 }}>
            <Text>Page 2</Text>
            <Text style={{ fontSize: 30, padding: 20, marginBottom: 20 }}>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Vero at
              quis mollitia repellat nisi quisquam ducimus provident eos, nam,
              totam ipsum culpa deleniti aliquam explicabo qui delectus omnis
              veniam? Nemo.
            </Text>
            <Text style={{ fontSize: 30, padding: 20, marginBottom: 20 }}>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Vero at
              quis mollitia repellat nisi quisquam ducimus provident eos, nam,
              totam ipsum culpa deleniti aliquam explicabo qui delectus omnis
              veniam? Nemo.
            </Text>
            <Text style={{ fontSize: 30, padding: 20, marginBottom: 20 }}>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Vero at
              quis mollitia repellat nisi quisquam ducimus provident eos, nam,
              totam ipsum culpa deleniti aliquam explicabo qui delectus omnis
              veniam? Nemo.
            </Text>
            <Text style={{ fontSize: 30, padding: 20, marginBottom: 20 }}>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Vero at
              quis mollitia repellat nisi quisquam ducimus provident eos, nam,
              totam ipsum culpa deleniti aliquam explicabo qui delectus omnis
              veniam? Nemo.
            </Text>
          </View>
        </ViewShot>
      </ScrollView>
    </View>
  );

  return (
    <View style={styles.root}>
      <TextInput
        style={styles.input}
        placeholder="Page width"
        keyboardType="numeric"
        defaultValue={width ? width.toString() : ''}
        onChangeText={(text) => {
          const n = parseFloat(text);
          setWidth(Number.isNaN(n) ? undefined : n);
        }}
      />
      <TextInput
        style={styles.input}
        placeholder="Page height"
        keyboardType="numeric"
        defaultValue={height ? height.toString() : ''}
        onChangeText={(text) => {
          const n = parseFloat(text);
          setHeight(Number.isNaN(n) ? undefined : n);
        }}
      />
      <TextInput
        style={styles.input}
        placeholder="Page background color"
        value={backgroundColor}
        onChangeText={setBackgroundColor}
        autoCapitalize="none"
      />
      <TextInput
        style={styles.input}
        placeholder="Image fit"
        defaultValue={imageFit}
        autoCapitalize="none"
        onChangeText={(text) => {
          const f = text.toLowerCase();
          switch (f) {
            case 'none':
            case 'cover':
            case 'contain':
            case 'fill':
              setImageFit(f);
              break;
            default:
              setImageFit(undefined);
          }
        }}
      />

      <TouchableOpacity
        style={[
          styles.button,
          {
            marginBottom: 20,
          },
        ]}
        onPress={selectImages}
        disabled={isLoading}
      >
        <Text style={styles.buttonText}>
          {isLoading ? 'Loading...' : 'Press to select images'}
        </Text>
      </TouchableOpacity>

      <Text>
        <Text style={styles.bold}>Page width:</Text> {width ?? 'image width'}
      </Text>
      <Text>
        <Text style={styles.bold}>Page height:</Text> {height ?? 'image height'}
      </Text>
      <Text>
        <Text style={styles.bold}>Image fit:</Text> {imageFit ?? 'none'}
      </Text>
      <Text>
        <Text style={styles.bold}>Output file name:</Text> {outputFilename}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  input: {
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#32a9d9',
    borderRadius: 10,
    paddingHorizontal: 10,
    minHeight: 40,
  },
  button: {
    backgroundColor: '#32a9d9',
    padding: 10,
    borderRadius: 10,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    textTransform: 'uppercase',
    textAlign: 'center',
  },
  bold: {
    fontWeight: 'bold',
  },
});
