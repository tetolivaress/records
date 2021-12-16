import React from "react";
import { Text, View, FlatList } from "react-native";
import { MovieFull } from '../../interfaces/movie';
import { Cast } from '../../interfaces/creditsInterface';
import StartIcon from "react-native-bootstrap-icons/icons/star";
import currencyFormatter from "currency-formatter"
import CastItem from "./CastItem";

interface Props {
  MovieFull: MovieFull;
  cast: Cast[]
}


const MovieDetails = ({MovieFull, cast}: Props) => {
  return (
    <>
      <View style={{flexDirection: 'row'}}>
          <StartIcon width="15" height="15" viewBox="0 0 16 16" fill="rgba(0,0,0,0.5)" />
          <Text>{MovieFull.vote_average}</Text>
      </View>
      <Text style={{padding: 12, fontSize: 18}}>
        {MovieFull.overview}
      </Text>
      <Text style={{padding: 12, fontSize: 18}}>Presupuesto</Text>
      <Text style={{padding: 12, fontSize: 15}}>
        {currencyFormatter.format(MovieFull.budget, {code: 'USD'}) }
      </Text>
      <FlatList
        data={cast}
        renderItem={({item}) => <CastItem actor={item} />}
        keyExtractor={(item) => item.id.toString()}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
      />
      
    </>
  )
}

export default MovieDetails