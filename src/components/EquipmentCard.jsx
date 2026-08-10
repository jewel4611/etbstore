const TYPE_LABELS = {
  equipment_rent: 'For Rent',
  equipment_sale: 'For Sale',
  spare_part: 'Spare Part',
  service: 'Service'
}

export default function EquipmentCard({ item, onRequest }) {
  return (
    <div className="equipment-card">
      <div className="thumb">
        {item.imageData
          ? <img src={item.imageData} alt={item.name} />
          : <span className="placeholder">No photo yet</span>}
      </div>
      <div className="body">
        <div className="type-tag">{TYPE_LABELS[item.type] || 'Equipment'}</div>
        <h3>{item.name}</h3>
        <p>{item.publicDescription || 'Contact us for full specifications and availability.'}</p>
        <button className="btn btn-primary btn-block" onClick={() => onRequest(item)}>Request a Quote</button>
      </div>
    </div>
  )
}
