import React from "react";
import { View } from "react-native";
import { Card, Button, Text, Avatar } from "react-native-elements";
import { AntDesign } from "@expo/vector-icons";
import { AuthContext } from "../providers/AuthProvider";


const PostCard = (props) => {
  // console.log(props.comments[0].comment + "----propsssss")'

  const commentCounter = props.comments;
  return (
    <AuthContext.Consumer>
      {(auth) => (
        <Card>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <Avatar
              containerStyle={{ backgroundColor: "orange" }}
              rounded
              icon={{ name: "user", type: "font-awesome", color: "black" }}
              activeOpacity={1}
            />
            <Text h4Style={{ padding: 10 }} h4>
              {props.author}
            </Text>
          </View>
          <Text style={{ fontStyle: "italic" }}> {props.title}</Text>
          <Text
            style={{
              paddingVertical: 10,
            }}
          >
            {props.body}
          </Text>
          <Card.Divider />
          <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
            <Button
              type="outline"
              title="  Like  "
              icon={<AntDesign name="like2" size={24} color="dodgerblue" />}
            />

            <Button
              type="solid"
              // title="Comment (10)"
              title={`comment (${commentCounter.length})`}
              onPress={() => {
                props.navigateToComment(props.postId, props.comments, auth.CurrentUser.uid);
              }}
            // onPress={props.navigateToComment}
            />
          </View>
        </Card>
      )}
    </AuthContext.Consumer>
  );
};

export default PostCard;
