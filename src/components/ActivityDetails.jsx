  import { useEffect, useState } from "react";
  import { useParams } from "react-router-dom";
  import { useDispatch } from "react-redux";
  import { updateActivity } from "../redux/slices/activitiesSlice";
  import api from "../utils/api";
  import ActivityForm from "./ActivityForm";
  import { Button, Spin } from "antd";


  const ActivityDetails = () => {
    const { id } = useParams();
    const dispatch = useDispatch();

    const [activity, setActivity] = useState(null);
    const [formData, setFormData] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [error, setError] = useState("");

    const user = JSON.parse(localStorage.getItem("user"));

    useEffect(() => {
      const fetchActivity = async () => {
        try {
          const res = await api.get(`/api/activities/${id}`);
          setActivity(res.data);
          setFormData({
            title: res.data.title,
            description: res.data.description,
            location: res.data.location,
            price: res.data.price,
            mainImage: null,
            gallery: [],
          });
        } catch (err) {
          setError("Impossible de charger l'activité.");
          console.error(err);
        }
      };

      fetchActivity();
    }, [id]);

    const handleChange = (e) => {
      const { name, value, files } = e.target;
      if (name === "mainImage") {
        setFormData((prev) => ({ ...prev, mainImage: files[0] }));
      } else if (name === "gallery") {
        setFormData((prev) => ({ ...prev, gallery: files }));
      } else {
        setFormData((prev) => ({ ...prev, [name]: value }));
      }
    };

    const handleReserveClick = () => {
      if (user.role === "client") {
        alert("Réservation commencée ! (On va construire la suite)");
      } else {
        alert("Seuls les clients peuvent réserver.");
      }
    };

    const handleSubmit = async (e) => {
      e.preventDefault();

      const data = new FormData();
      for (let key in formData) {
        if (key === "gallery") {
          for (let file of formData.gallery) {
            data.append("gallery", file);
          }
        } else {
          data.append(key, formData[key]);
        }
      }

      try {
        await dispatch(updateActivity({ id, formData: data })).unwrap();
        setIsEditing(false);
        const res = await api.get(`/api/activities/${id}`);
        setActivity(res.data);
      } catch (err) {
        alert("Erreur lors de la mise à jour");
        console.error(err);
      }
    };

    if (error) return <p className="text-red-500">{error}</p>;
    if (!activity || !formData) return <p>Chargement...</p>;

    return (
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Title */}
        <h2 className="text-3xl font-bold mb-6 text-gray-800 text-center">
          {activity.title}
        </h2>
    
        {/* Main Image */}
        <img
          src={activity.mainImage}
          alt={activity.title}
          className="w-full h-96 object-cover rounded-lg shadow-md mb-8"
        />
    
        
        
          <div className="flex justify-end mb-10">
            <button
              type="primary"
              size="large"
              onClick={handleReserveClick}
              className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-6 rounded-lg transform hover:scale-105 transition-transform duration-200"
            >
              Réserver
            </button>
          </div>
       
    
        {!isEditing ? (
          <>
            {/* Activity Details */}
            <div className="flex flex-col items-center space-y-6 mb-12 text-gray-700">
              <p className="text-center">
                <strong className="text-gray-900">Description :</strong> {activity.description}
              </p>
              <p className="text-center">
                <strong className="text-gray-900">Lieu :</strong> {activity.location}
              </p>
              <p className="text-center">
                <strong className="text-gray-900">Prix :</strong> {activity.price} TND
              </p>
              <p className="text-center">
                <strong className="text-gray-900">Organisé par :</strong> {activity.manager?.name}
              </p>
            </div>
    
            {/* Gallery */}
            {activity.gallery?.length > 0 && (
              <div className="mb-8 flex flex-col items-center">
                <h4 className="text-xl font-semibold mb-6 text-gray-800 text-center">
                  Galerie
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                  {activity.gallery.map((img, index) => (
                    <img
                      key={index}
                      src={img}
                      alt={`Gallery ${index}`}
                      className="w-full h-48 object-cover rounded-lg shadow-sm transform hover:scale-105 transition-transform duration-300"
                    />
                  ))}
                </div>
              </div>
            )}
    
            {/* Edit Button for Admin or Manager */}
            {(user?.role === "admin" || user?.id === activity.manager?._id) && (
              <div className="flex justify-center mt-8">
                <Button
                  onClick={() => setIsEditing(true)}
                  size="large"
                  style={{ backgroundColor: "#f59e0b", borderColor: "#f59e0b" }}
                  className="text-white rounded-lg hover:scale-105 transition-transform duration-200"
                >
                  ✏️ Modifier cette activité
                </Button>
              </div>
            )}
          </>
        ) : (
          // Editing mode
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-2xl mx-4">
              <h3 className="text-2xl font-semibold mb-6 text-center text-gray-800">
                Modifier activité
              </h3>
              <ActivityForm
                formData={formData}
                onChange={handleChange}
                onSubmit={handleSubmit}
                loading={false}
                mode="edit"
                onCancel={() => setIsEditing(false)}
              />
            </div>
          </div>
        )}
      </div>
    );
    
    
    
  };

  export default ActivityDetails;