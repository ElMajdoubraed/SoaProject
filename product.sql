-- test.products definition

CREATE TABLE `products` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT 'Primary Key',
  `create_time` datetime DEFAULT CURRENT_TIMESTAMP COMMENT 'Create Time',
  `name` varchar(25) DEFAULT NULL,
  `model` varchar(25) DEFAULT NULL,
  `price` int(11) DEFAULT NULL,
  `sale` bit(1) DEFAULT b'0',
  `description` varchar(255) DEFAULT NULL,
  `image` varchar(255) DEFAULT NULL,
  `isModel` bit(1) DEFAULT b'0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=31 DEFAULT CHARSET=latin1;

INSERT INTO products (create_time,name,model,price,sale,description,image,isModel) VALUES
	 (NULL,'product 1','model 1',500,1,'no','https://media.istockphoto.com/id/1198863709/photo/skin-and-hair-care-beauty-product-mock-up-lotion-bottle-oil-cream-isolated-on-white-3d-render.jpg?s=612x612&w=0&k=20&c=_0-9dLUohaQrThH0669Ygx3Ar17rX0cRkXy0cEexfQw=',0),
	 (NULL,'product 2','model 2',200,0,'no','https://cdn4.avada.io/media/shopify/dmPYgF1.png',0),
	 (NULL,'product 3','model 1',100,0,'no','https://burst.shopifycdn.com/photos/digital-download-music.jpg?width=1200&format=pjpg&exif=1&iptc=1',1),
	 (NULL,'model 1','model',122,0,'secription','https://burst.shopifycdn.com/photos/photography-product-download.jpg?width=1200&format=pjpg&exif=1&iptc=1',1),
	 (NULL,'model 2','model',233,0,'des','https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8cHJvZHVjdHxlbnwwfHwwfHw%3D&w=1000&q=80',1),
	 (NULL,'model 3','model',11,0,'a','https://burst.shopifycdn.com/photos/wrist-watches.jpg?width=1200&format=pjpg&exif=1&iptc=1',1),
	 ('0000-00-00 00:00:00','Smart Watch HAVIT Fitness','smart watch',11,1,'ddd','https://mtsplus.tn/2299-large_default/smart-watch-havit-m9006-pro.jpg',0);