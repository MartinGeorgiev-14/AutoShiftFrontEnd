import styled from "styled-components";
import { useDispatch } from "react-redux";
import { selectOption } from "../../../../reducers/formSelectedOptionsReducer";

const Container = styled.div`
`

const Div = styled.div`
`

const Img = styled.img`
    width: 100px;

        &.selected{
        outline: 2px solid red;
    }
`

const SelectMainImg = ({ images }) => {
    const dispatch = useDispatch()

    const handleSelectImage = (event) => {
        event.preventDefault()

        const imgs = document.querySelectorAll('.list-img')
        const target = event.target
        const index = target.getAttribute("name")  

        dispatch(selectOption({prop: 'mainImgIndex', value: index}))
        
        imgs.forEach(img => img.classList.remove('selected'))
        target.classList.add('selected')
    }

    return(
        <Container>
            <h2>Main image</h2>
            <Div>
                {
                    images.map((a, i) => {

                        return(
                            <Img key={a + i} src={`data:${a.type};base64,${a.imageData}`} onClick={handleSelectImage} name={i}
                            className="list-img"/>
                        )
                    })
                }
            </Div>
        </Container>
    )
}

{/* <Img key={index} src={URL.createObjectURL(image)} */}
// alt={`Preview ${index}`} name={index} className="list-img" onClick={handleSelectMainImg}/>


// images.map(i => 
//     <Img src={`data:${mainImg[0].type};base64,${mainImg[0].imageData}`}/>)
export default SelectMainImg