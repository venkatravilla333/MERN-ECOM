import {useState} from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { getPriceQueryParams } from '../../helpers/helpers'
let Filters = () => {

 let [minValue, setMinvalue] = useState()
  let [maxValue, setMaxvalue] = useState()
  
  let [searchParams] = useSearchParams()
 let navigate = useNavigate()

  let handlePriceFilter = (e) => {
    
  console.log('hello')
    e.preventDefault()
   searchParams = getPriceQueryParams(searchParams, "min", minValue)
   searchParams = getPriceQueryParams(searchParams, "max", maxValue)
    
    let path = window.location.pathname + "?" + searchParams.toString()
    
    navigate(path)
    
   console.log(path)
    
    
  }

  return (
    <div class="border p-3 filter">
      <h3>Filters</h3>
      <hr />
      <h5 class="filter-heading mb-3">Price</h5>
      <form onSubmit={handlePriceFilter}>
        <div class="row">
          <div class="col">
            <input
              type="text"
              class="form-control"
              placeholder="Min ($)"
              name="min"
              value={minValue}
              onChange={(e)=> setMinvalue(e.target.value)}
            />
          </div>
          <div class="col">
            <input
              type="text"
              class="form-control"
              placeholder="Max ($)"
              name="max"
              value={maxValue}
              onChange={(e)=> setMaxvalue(e.target.value)}
            />
          </div>
          <div class="col">
            <button type="submit" class="btn btn-primary">GO</button>
          </div>
        </div>
      </form>
      <hr />
      <h5 class="mb-3">Category</h5>

      <div class="form-check">
        <input
          class="form-check-input"
          type="checkbox"
          name="category"
          id="check4"
          value=""
        />
        <label class="form-check-label" for="check4">Eectronics </label>
      </div>
      <div class="form-check">
        <input
          class="form-check-input"
          type="checkbox"
          name="category"
          id="check5"
          value="Category 2"
        />
        <label class="form-check-label" for="check5">Cloths</label>
      </div>

      <hr />
      <h5 class="mb-3">Ratings</h5>

      <div class="form-check">
        <input
          class="form-check-input"
          type="checkbox"
          name="ratings"
          id="check7"
          value="5"
        />
        <label class="form-check-label" for="check7">
          <span class="star-rating">★ ★ ★ ★ ★</span>
        </label>
      </div>
      <div class="form-check">
        <input
          class="form-check-input"
          type="checkbox"
          name="ratings"
          id="check8"
          value="4"
        />
        <label class="form-check-label" for="check8">
          <span class="star-rating">★ ★ ★ ★ ☆</span>
        </label>
      </div>
    </div>)
}

export default Filters