export type ValueType = {
  id: "one-parcel" | "two-parcel" | "three-parcel" | "four-parcel" | "five-parcel" | "six-parcel" | "seven-parcel",
  parcels: number
  value: number
}

export const parcels: ValueType[] = [
  {
    id: 'one-parcel',
    parcels: 1,
    value: 30500.00
  },
  {
    id: 'two-parcel',
    parcels: 2,
    value: 30600.00
  },
  {
    id: 'three-parcel',
    parcels: 3,
    value: 30620.00
  },
  {
    id: 'four-parcel',
    parcels: 4,
    value: 30900.00
  },
  {
    id: 'five-parcel',
    parcels: 5,
    value: 31500.00
  },
  {
    id: 'six-parcel',
    parcels: 6,
    value: 31699.98
  },
  {
    id: 'seven-parcel',
    parcels: 7,
    value: 31800.00
  },
]