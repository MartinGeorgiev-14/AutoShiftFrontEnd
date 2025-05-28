import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { selectOption } from "../../../../reducers/formSelectedOptionsReducer";
import { useState } from "react";
import { RxValue } from "react-icons/rx";
import { v4 as uuidv4 } from 'uuid';

const Component = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    
`

const Div = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`
const Label = styled.div`
`

const Input = styled.input`
`   

const Img = styled.img`
    width: 15rem;

    &.selected{
        outline: 2px solid red;
    }
`

const ImageInput = ({images, setImages}) => {
    const dispatch = useDispatch()
    const selected = useSelector(s => s.formSelected)

    const handleFileChange = (event) => {
        event.preventDefault()
    
        const files = Array.from(event.target.files)
        const renamedFiles = files.map((file, index) => {
            const newFile = new File([file], `${uuidv4()}`, { type: file.type });
            return newFile;
        })

        setImages([...images, ...renamedFiles])
    }

    const handleSelectMainImg = (event) => {
        event.preventDefault()
        
        const imgs = document.querySelectorAll('.list-img')
        const target = event.target
        const index = target.getAttribute("name")  
        console.log("index", index)
        dispatch(selectOption({prop: 'mainImgId', value: index}))
        
        imgs.forEach(img => img.classList.remove('selected'))
        target.classList.add('selected')

    }

    return(
        <Component>
            <Label>Images</Label>
            <Input type="file" name="image" accept="image/*" multiple onChange={handleFileChange}/>

            <Div>
                <h4>Preview</h4>
                {
                    images.map((image, index) => {
                        console.log("image", image.name)
                        return(
                            <Img key={index} src={URL.createObjectURL(image)}
                                alt={`Preview ${index}`} name={image.name} className="list-img" onClick={handleSelectMainImg}/>
                        )
                    })
                }
            </Div>        
        </Component>
    )
}

export default ImageInput;