import { FC, ReactElement, Ref, forwardRef, useState } from 'react';

import { ShoppingCart as ShoppingCartIcon } from '@mui/icons-material';
import {
  AppBar,
  Button,
  Container,
  Dialog,
  Divider,
  Grid,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Slide,
  Toolbar,
  Tooltip,
  Typography,
} from '@mui/material';
import type { TransitionProps } from '@mui/material/transitions';
import { ArrowLeft as ArrowLeftIcon } from 'mdi-material-ui';

import CustomizedBadges from './CustomizedBadges';

import { Section } from '~/components';
import { formatNumber } from '~/utils';
const Transition = forwardRef(function Transition(
  props: TransitionProps & { children?: ReactElement },
  ref: Ref<unknown>
) {
  // @ts-ignore
  return <Slide direction='up' ref={ref} {...props} />;
});

interface SelectedItem {
  _id: string;
  price: number;
  category: string;
  availability: string;
  storesAssigned: string[];
  name: string;
  description: string;
  ownerId: string;
}

interface SelectedItemsListProps {
  selectedItems: SelectedItem[];
}

interface CartDialogProps {
  selectedItems: {
    products: SelectedItem[];
    services: SelectedItem[];
  };
}

const CartDialog: FC<CartDialogProps> = ({ selectedItems }) => {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const SelectedItemsList: FC<SelectedItemsListProps> = ({ selectedItems }) => {
    // Calculate frequency of each item in selectedItems
    const itemCounts = selectedItems.reduce((counts, item) => {
      if (!counts[item._id]) {
        counts[item._id] = { count: 0, item };
      }
      counts[item._id].count++;
      return counts;
    }, {} as { [key: string]: { count: number; item: SelectedItem } });

    console.log('itemCounts: ', itemCounts);

    return (
      <>
        {Object.values(itemCounts).map(({ count, item }, index, array) => (
          <>
            <Grid container spacing={2} columns={16}>
              <Grid item xs={8}>
                <List>
                  <ListItem key={item._id}>
                    <ListItemText
                      primary={item.name}
                      secondary={`${count} pieces`}
                    />
                  </ListItem>
                </List>
              </Grid>
              <Grid item xs={8}>
                <List>
                  <ListItem>
                    <ListItemText
                      sx={{ mt: '16px', textAlign: 'right' }}
                      primary={formatNumber(item.price * count) + ' PHP'}
                    />
                  </ListItem>
                </List>
              </Grid>
            </Grid>
            {index < array.length - 1 && <Divider />}
          </>
        ))}
      </>
    );
  };

  return (
    <>
      <Tooltip
        title={
          selectedItems.products.length + selectedItems.services.length != 0
            ? 'View ' +
              (selectedItems.products.length + selectedItems.services.length) +
              ' Items in Cart'
            : 'View Cart'
        }
        placement='right-start'
      >
        <IconButton onClick={handleClickOpen}>
          <CustomizedBadges
            cartItemCount={
              selectedItems.products.length + selectedItems.services.length
            }
          >
            <ShoppingCartIcon fontSize='large' />
          </CustomizedBadges>
        </IconButton>
      </Tooltip>

      <Dialog
        open={open}
        fullScreen
        onClose={handleClose}
        TransitionComponent={Transition}
        PaperProps={{
          sx: {
            backgroundImage: 'none',
            backgroundColor: 'background.default',
          },
        }}
      >
        <AppBar
          sx={{
            position: 'relative',
            mb: 3,
          }}
        >
          <Toolbar>
            <IconButton
              color='inherit'
              edge='start'
              onClick={handleClose}
              aria-label='close'
            >
              <ArrowLeftIcon />
            </IconButton>
            <Typography
              variant='h3'
              sx={{
                flex: 1,
                ml: 2,
              }}
            >
              Item Cart
            </Typography>
          </Toolbar>
        </AppBar>

        <Container maxWidth='lg' style={{ marginBottom: '1rem' }}>
          {selectedItems.products.length != 0 ||
          selectedItems.services.length != 0 ? (
            <>
              <Section gutterBottom>
                <Typography variant='h5'>Products</Typography>
                <SelectedItemsList selectedItems={selectedItems.products} />

                <Divider sx={{ mt: '16px', mb: '32px' }} />

                <Typography variant='h5'>Services</Typography>
                <SelectedItemsList selectedItems={selectedItems.services} />
              </Section>

              <Button variant='contained' fullWidth sx={{ mt: '6px' }}>
                Charge Transaction
                <br />
                0.00
              </Button>
            </>
          ) : (
            ''
          )}
        </Container>
      </Dialog>
    </>
  );
};
export default CartDialog;
