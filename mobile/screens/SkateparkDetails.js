import React, { useState } from 'react';
import { View, Text, Dimensions, ScrollView } from 'react-native';

import LoadingCircle from '../components/common/LoadingCircle';
import Button from '../components/common/Button';

import AdditionalInfo from '../components/SkateparkDetails/InfoReviews/AdditionalInfo';
import Reviews from '../components/SkateparkDetails/InfoReviews/Reviews';
import Obstacles from '../components/SkateparkDetails/Obstacles/Obstacles';

import useFetch from '../hooks/useFetch';

import styles from '../styles/SkateparkDetailsStyles';

styles.column = {
  ...styles.column,
  width: Dimensions.get('window').width,
};

const SkateparkDetails = ({ navigation, route }) => {
  const skatepark = route.params.skatepark;

  const {
    data: reviews,
    isLoading,
    error,
    changeData: setReviews,
  } = useFetch('reviews', skatepark.skateparkId);

  const newReview = review => {
    setReviews(prevReviews => {
      review.reviewId = prevReviews.length + 1;
      return [review, ...prevReviews];
    });
  };

  const [hScrollRef, setHScrollRef] = useState(null);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{skatepark.name}</Text>

      <View style={styles.horizontalScroll}>
        <ScrollView
          ref={ref => {
            setHScrollRef(ref);
          }}
          horizontal={true}
          pagingEnabled={true}
        >
          <View style={styles.column}>
            <AdditionalInfo skatepark={skatepark} />

            <Button
              title="To Obstacles"
              onPress={() => {
                hScrollRef.scrollTo({
                  x: Dimensions.get('window').width,
                  animated: true,
                });
              }}
            />

            {isLoading && <LoadingCircle />}
            {error && <Text>Error!</Text>}
            {reviews && (
              <Reviews
                reviews={reviews}
                navigation={navigation}
                newReview={newReview}
              />
            )}
          </View>
          <View style={styles.column}>
            <Obstacles />
          </View>
        </ScrollView>
      </View>
    </View>
  );
};

export default SkateparkDetails;
