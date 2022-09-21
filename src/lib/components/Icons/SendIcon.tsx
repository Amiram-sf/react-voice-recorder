import { ReactElement } from 'react'
import { IIcon } from '../../utils/base-models'

function SendIcon({
  color = 'white',
  height = 16,
  width = 16
}: IIcon): ReactElement {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      viewBox="0 0 420.123 443.046"
      fill={color}
    >
      <path d="M567.95,254.25,206.15,61.89a29.162,29.162,0,0,0-41.906,33.121l47.941,183.52a6.029,6.029,0,0,1,0,2.938l-47.941,183.52A29.162,29.162,0,0,0,206.15,498.11c82.309-43.762,285.96-152.04,361.8-192.36a29.166,29.166,0,0,0,0-51.5Z"
        transform="translate(-163.296 -58.477)"
        fillRule="evenodd"
      />
    </svg>
  )
}

export default SendIcon