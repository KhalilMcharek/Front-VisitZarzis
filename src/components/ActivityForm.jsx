import styles from "../styles/modal.module.css";

const ActivityForm = ({
  formData,
  onChange,
  onSubmit,
  loading,
  mode = "add",
  onCancel,
}) => {
  return (
    <form onSubmit={onSubmit}>
      <input
        name="title"
        placeholder="Titre"
        value={formData.title}
        onChange={onChange}
        required
      />
      <textarea
        name="description"
        placeholder="Description"
        value={formData.description}
        onChange={onChange}
        required
      />
      <input
        name="location"
        placeholder="Lieu"
        value={formData.location}
        onChange={onChange}
        required
      />
      <input
        name="price"
        type="number"
        placeholder="Prix"
        value={formData.price}
        onChange={onChange}
        required
      />

      <label>Image principale</label>
      <input
        name="mainImage"
        type="file"
        accept="image/*"
        onChange={onChange}
        {...(mode === "add" ? { required: true } : {})}
      />

      <label>Galerie (optionnel)</label>
      <input
        name="gallery"
        type="file"
        accept="image/*"
        multiple
        onChange={onChange}
      />

      <div style={{ marginTop: "10px" }}>
        <button type="submit" disabled={loading}>
          {loading
            ? mode === "edit"
              ? "Mise à jour..."
              : "Ajout en cours..."
            : mode === "edit"
            ? "Mettre à jour"
            : "Ajouter"}
        </button>
        {onCancel && (
          <button
            type="button"
            onClick={onCancel}
            style={{ marginLeft: "10px" }}
          >
            Annuler
          </button>
        )}
      </div>
    </form>
  );
};

export default ActivityForm;
