import PropTypes from 'prop-types';
import { FormStyled, Header, Input, SerchFormButton } from './SearchBar.styled';
import { useState } from 'react';
import sprite from '../../img/sprite.svg';
import { Svg } from 'components/icon/Icon';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const Searchbar = ({ onSubmit }) => {
    const [query, updQuery] = useState('');

    const handleInput = e => updQuery(e.target.value);

    const handleOnSubmit = e => {
        e.preventDefault();
        if (!query) {
            toast('Please enter a query');
            return;
        }
        onSubmit(query);
        updQuery('');
        e.target.reset();
    };

    return (
        <Header>
            <FormStyled onSubmit={handleOnSubmit}>
                <Input
                    type="text"
                    name="searchQuery"
                    autoComplete="off"
                    placeholder="Search images..."
                    onChange={handleInput}
                />
                <SerchFormButton type="submit">
                    <Svg width={20} height={20} use={sprite + '#icon-search'} />
                </SerchFormButton>
            </FormStyled>
        </Header>
    );
};

Searchbar.propTypes = {
    onSubmit: PropTypes.func.isRequired,
};
