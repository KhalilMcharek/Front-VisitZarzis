import React, { useState, useEffect } from "react";
import { Layout, Typography, Input, Row, Col,Spin } from "antd";
import { useDispatch , useSelector } from "react-redux";
import { fetchFilteredActivities, fetchActivities, setFilters } from "../redux/slices/activitiesSlice";
import ActivitiesList from "../components/ActivitiesList";

const { Content } = Layout;
const { Title } = Typography;

const HomePage = () => {
  const dispatch = useDispatch();
  const { query, location, minPrice, maxPrice,loading } = useSelector((state) => state.activities);

 const handleInputChange = (field, value) => {
    dispatch(setFilters({
      query: field === 'query' ? value : query,
      location: field === 'location' ? value : location,
      minPrice: field === 'minPrice' ? value : minPrice,
      maxPrice: field === 'maxPrice' ? value : maxPrice,
    }));
  };
  useEffect(() => {
    const timeout = setTimeout(() => {
      const hasFilters = query || location || minPrice || maxPrice;
      if (hasFilters) {
        dispatch(fetchFilteredActivities({ query, location, minPrice, maxPrice }));
      } else {
        dispatch(fetchActivities());
      }
    }, 500);

    return () => clearTimeout(timeout);
  }, [query, location, minPrice, maxPrice, dispatch]);

  useEffect(() => {
    dispatch(fetchActivities());
  }, [dispatch]);

  return (
    <Layout style={{ padding: "40px", backgroundColor: "#fff" }}>
      <Content>
        <Title level={2} style={{ textAlign: "center" }}>
          Découvrez les meilleures activités à Zarzis 🏝️
        </Title>

        <Row gutter={16} style={{ marginBottom: 24 }}>
  <Col span={6}>
    <Input
      placeholder="Recherche"
      value={query}
      onChange={(e) => handleInputChange('query', e.target.value)}
    />
  </Col>
  <Col span={4}>
    <Input
      placeholder="Lieu"
      value={location}
      onChange={(e) => handleInputChange('location', e.target.value)}
    />
  </Col>
  <Col span={3}>
    <Input
      placeholder="Prix min"
      type="number"
      value={minPrice}
      onChange={(e) => handleInputChange('minPrice', e.target.value)}
    />
  </Col>
  <Col span={3}>
    <Input
      placeholder="Prix max"
      type="number"
      value={maxPrice}
      onChange={(e) => handleInputChange('maxPrice', e.target.value)}
    />
  </Col>
</Row>
{loading ? (
  <div style={{ textAlign: "center", marginTop: "20px" }}>
      <Spin size="large" />
  </div>
) : (
        <ActivitiesList showControls={false} />
)}
      </Content>
    </Layout>
  );
};

export default HomePage;
