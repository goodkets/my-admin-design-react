import { Row,Col,Card } from "antd"
import React,{ useState } from "react"
import { COMPRESS_IMG_SRC } from "@/mockData/websiteSetting"
interface FormState {
    width: number
    height: number
    ratio: number
    quality: number
    mimeType: string
  }
  
  interface ImageState {
    width: number
    height: number
    aspectRatio: number
    imgSrc: string
  }
  
  const defaultForm: FormState = {
    width: 1920,
    height: 1080,
    ratio: 100,
    quality: 1,
    mimeType: 'image/png'
  }
  const defaultImage: ImageState = {
    width: 1920,
    height: 1080,
    aspectRatio: 1920 / 1080,
    imgSrc: COMPRESS_IMG_SRC
  }
const imageCompress: React.FC = () => {
    const [imageInfo, setImageInfo] = useState(defaultImage)

      
    return (
            <Row gutter={20}>
                <Col span={16}>
                    <Card title="图片区域" hoverable={true} >
                    
              <div style={{ width: '100%', height: '55vh' }}> 
              <img
                style={{
                  width: '100%',
                  height: '100%',
                  backgroundSize: 'contain',
                  backgroundPosition: 'center',
                  backgroundRepeat: 'no-repeat',
                }}
                src={imageInfo.imgSrc}
              />
              </div>
            
                    </Card>
                </Col>
                <Col span={8}  >
                <Card title="设置区域" hoverable={true}>
                    <div style={{ width: '100%', height: '55vh' }}>
                        asd
                    </div>
                </Card>
                </Col>
            </Row>
    )
}
export default imageCompress