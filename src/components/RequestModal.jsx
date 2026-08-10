import { useState } from 'react'
import { submitOrderRequest } from '../utils/firestore'

export default function RequestModal({ equipment, onClose }) {
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [email, setEmail] = useState('')
  const [company, setCompany] = useState('')
  const [rentalFrom, setRentalFrom] = useState('')
  const [rentalTo, setRentalTo] = useState('')
  const [workLocation, setWorkLocation] = useState('')
  const [jobDetails, setJobDetails] = useState('')
  const [operatorAccommodation, setOperatorAccommodation] = useState('client')
  const [fuelCost, setFuelCost] = useState('client')
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState('')
  const [done, setDone] = useState(false)

  const submit = async (e) => {
    e.preventDefault()
    setError('')
    setSubmitting(true)
    try {
      await submitOrderRequest({
        clientName: name.trim(),
        clientPhone: phone.trim(),
        clientEmail: email.trim(),
        clientCompany: company.trim(),
        equipmentId: equipment?.id || null,
        equipmentName: equipment?.name || 'Not specified',
        rentalFrom, rentalTo,
        workLocation: workLocation.trim(),
        jobDetails: jobDetails.trim(),
        operatorAccommodation, fuelCost
      })
      setDone(true)
    } catch (err) {
      setError('Something went wrong sending your request. Please try again, or call us directly.')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal" onClick={e => e.stopPropagation()}>
        {done ? (
          <div className="success-box">
            <div className="check">✓</div>
            <h3>Request sent</h3>
            <p>Thanks{name ? `, ${name}` : ''} — we've received your request{equipment ? ` for ${equipment.name}` : ''}. Our team will review it and get back to you with a quotation shortly.</p>
            <button className="btn btn-primary" onClick={onClose}>Close</button>
          </div>
        ) : (
          <>
            <div className="modal-head">
              <div>
                <h2>Request a Quote</h2>
                <div className="sub">{equipment ? equipment.name : 'Tell us what you need and we\'ll send pricing back'}</div>
              </div>
              <button className="icon-btn" onClick={onClose}>×</button>
            </div>

            {error && <div className="error-msg" style={{ marginTop: 16 }}>{error}</div>}

            <form onSubmit={submit} style={{ marginTop: 18 }}>
              <div className="field-row">
                <div className="field">
                  <label>Your Name *</label>
                  <input required value={name} onChange={e => setName(e.target.value)} />
                </div>
                <div className="field">
                  <label>Phone Number *</label>
                  <input required type="tel" value={phone} onChange={e => setPhone(e.target.value)} />
                </div>
              </div>
              <div className="field-row">
                <div className="field">
                  <label>Company (optional)</label>
                  <input value={company} onChange={e => setCompany(e.target.value)} />
                </div>
                <div className="field">
                  <label>Email (optional)</label>
                  <input type="email" value={email} onChange={e => setEmail(e.target.value)} />
                </div>
              </div>

              <div className="field-row">
                <div className="field">
                  <label>Rental From</label>
                  <input type="date" value={rentalFrom} onChange={e => setRentalFrom(e.target.value)} />
                </div>
                <div className="field">
                  <label>Rental To</label>
                  <input type="date" value={rentalTo} onChange={e => setRentalTo(e.target.value)} />
                </div>
              </div>

              <div className="field">
                <label>Work Location *</label>
                <input required value={workLocation} onChange={e => setWorkLocation(e.target.value)} placeholder="e.g. Mirpur-1, Dhaka" />
              </div>

              <div className="field">
                <label>Job Details *</label>
                <textarea required rows={3} value={jobDetails} onChange={e => setJobDetails(e.target.value)} placeholder="What will you use the equipment for?" />
              </div>

              <div className="field-row">
                <div className="field">
                  <label>Operator Accommodation</label>
                  <div className="radio-group">
                    <label className="radio-option">
                      <input type="radio" name="opAcc" checked={operatorAccommodation === 'client'} onChange={() => setOperatorAccommodation('client')} />
                      We'll arrange it
                    </label>
                    <label className="radio-option">
                      <input type="radio" name="opAcc" checked={operatorAccommodation === 'company'} onChange={() => setOperatorAccommodation('company')} />
                      ETB to arrange
                    </label>
                  </div>
                </div>
                <div className="field">
                  <label>Fuel Cost</label>
                  <div className="radio-group">
                    <label className="radio-option">
                      <input type="radio" name="fuel" checked={fuelCost === 'client'} onChange={() => setFuelCost('client')} />
                      We'll bear it
                    </label>
                    <label className="radio-option">
                      <input type="radio" name="fuel" checked={fuelCost === 'company'} onChange={() => setFuelCost('company')} />
                      ETB to bear it
                    </label>
                  </div>
                </div>
              </div>

              <div className="form-actions">
                <button type="button" className="btn btn-outline" onClick={onClose}>Cancel</button>
                <button type="submit" className="btn btn-primary" disabled={submitting}>
                  {submitting ? 'Sending...' : 'Send Request'}
                </button>
              </div>
            </form>
          </>
        )}
      </div>
    </div>
  )
}
