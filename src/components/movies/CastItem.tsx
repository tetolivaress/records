import React from "react";
import { Image, Text, View } from "react-native";
import { Cast } from "../../interfaces/creditsInterface";

interface Props {
  actor: Cast
}

const CastItem = ({ actor }: Props) => {

  const uri = `https://image.tmdb.org/t/p/w500/${actor.profile_path}`

  return (
    <View style={{flexDirection: 'row'}}>
      {actor.profile_path && (
        <Image 
          source={{uri}}
          style={{ width: 50, height: 50, borderRadius: 12 }}
        />
      )}
      <View>
        <Text>{actor.name}</Text>
        <Text>{actor.character}</Text>
      </View>
    </View>
  )
}

export default CastItem