DROP TABLE IF EXISTS `e-commerce-test`.`attribute`;
DROP TABLE IF EXISTS `e-commerce-test`.`attribute_value`;
DROP TABLE IF EXISTS `e-commerce-test`.`audit`;
DROP TABLE IF EXISTS `e-commerce-test`.`category`;
DROP TABLE IF EXISTS `e-commerce-test`.`customer`;
DROP TABLE IF EXISTS `e-commerce-test`.`department`;
DROP TABLE IF EXISTS `e-commerce-test`.`order_detail`;
DROP TABLE IF EXISTS `e-commerce-test`.`orders`;
DROP TABLE IF EXISTS `e-commerce-test`.`product`;
DROP TABLE IF EXISTS `e-commerce-test`.`product_attribute`;
DROP TABLE IF EXISTS `e-commerce-test`.`product_category`;
DROP TABLE IF EXISTS `e-commerce-test`.`review`;
DROP TABLE IF EXISTS `e-commerce-test`.`shipping`;
DROP TABLE IF EXISTS `e-commerce-test`.`shipping_region`;
DROP TABLE IF EXISTS `e-commerce-test`.`shopping_cart`;
DROP TABLE IF EXISTS `e-commerce-test`.`tax`;

DROP PROCEDURE IF EXISTS `e-commerce-test`.`catalog_add_attribute`;
DROP PROCEDURE IF EXISTS `e-commerce-test`.`catalog_add_attribute_value`;
DROP PROCEDURE IF EXISTS `e-commerce-test`.`catalog_add_category`;
DROP PROCEDURE IF EXISTS `e-commerce-test`.`catalog_add_department`;
DROP PROCEDURE IF EXISTS `e-commerce-test`.`catalog_add_product_to_category`;
DROP PROCEDURE IF EXISTS `e-commerce-test`.`catalog_assign_attribute_value_to_product`;
DROP PROCEDURE IF EXISTS `e-commerce-test`.`catalog_assign_product_to_category`;
DROP PROCEDURE IF EXISTS `e-commerce-test`.`catalog_count_products_in_category`;
DROP PROCEDURE IF EXISTS `e-commerce-test`.`catalog_count_products_on_catalog`;
DROP PROCEDURE IF EXISTS `e-commerce-test`.`catalog_count_products_on_department`;
DROP PROCEDURE IF EXISTS `e-commerce-test`.`catalog_count_search_result`;
DROP PROCEDURE IF EXISTS `e-commerce-test`.`catalog_create_product_review`;
DROP PROCEDURE IF EXISTS `e-commerce-test`.`catalog_delete_attribute`;
DROP PROCEDURE IF EXISTS `e-commerce-test`.`catalog_delete_attribute_value`;
DROP PROCEDURE IF EXISTS `e-commerce-test`.`catalog_delete_category`;
DROP PROCEDURE IF EXISTS `e-commerce-test`.`catalog_delete_department`;
DROP PROCEDURE IF EXISTS `e-commerce-test`.`catalog_delete_product`;
DROP PROCEDURE IF EXISTS `e-commerce-test`.`catalog_get_attribute_details`;
DROP PROCEDURE IF EXISTS `e-commerce-test`.`catalog_get_attributes`;
DROP PROCEDURE IF EXISTS `e-commerce-test`.`catalog_get_attributes_not_assigned_to_product`;
DROP PROCEDURE IF EXISTS `e-commerce-test`.`catalog_get_attribute_values`;
DROP PROCEDURE IF EXISTS `e-commerce-test`.`catalog_get_categories`;
DROP PROCEDURE IF EXISTS `e-commerce-test`.`catalog_get_categories_for_product`;
DROP PROCEDURE IF EXISTS `e-commerce-test`.`catalog_get_categories_list`;
DROP PROCEDURE IF EXISTS `e-commerce-test`.`catalog_get_category_details`;
DROP PROCEDURE IF EXISTS `e-commerce-test`.`catalog_get_category_name`;
DROP PROCEDURE IF EXISTS `e-commerce-test`.`catalog_get_category_products`;
DROP PROCEDURE IF EXISTS `e-commerce-test`.`catalog_get_department_categories`;
DROP PROCEDURE IF EXISTS `e-commerce-test`.`catalog_get_department_details`;
DROP PROCEDURE IF EXISTS `e-commerce-test`.`catalog_get_department_name`;
DROP PROCEDURE IF EXISTS `e-commerce-test`.`catalog_get_departments`;
DROP PROCEDURE IF EXISTS `e-commerce-test`.`catalog_get_departments_list`;
DROP PROCEDURE IF EXISTS `e-commerce-test`.`catalog_get_product_attributes`;
DROP PROCEDURE IF EXISTS `e-commerce-test`.`catalog_get_product_details`;
DROP PROCEDURE IF EXISTS `e-commerce-test`.`catalog_get_product_info`;
DROP PROCEDURE IF EXISTS `e-commerce-test`.`catalog_get_product_locations`;
DROP PROCEDURE IF EXISTS `e-commerce-test`.`catalog_get_product_name`;
DROP PROCEDURE IF EXISTS `e-commerce-test`.`catalog_get_product_reviews`;
DROP PROCEDURE IF EXISTS `e-commerce-test`.`catalog_get_products_in_category`;
DROP PROCEDURE IF EXISTS `e-commerce-test`.`catalog_get_products_on_catalog`;
DROP PROCEDURE IF EXISTS `e-commerce-test`.`catalog_get_products_on_department`;
DROP PROCEDURE IF EXISTS `e-commerce-test`.`catalog_get_recommendations`;
DROP PROCEDURE IF EXISTS `e-commerce-test`.`catalog_move_product_to_category`;
DROP PROCEDURE IF EXISTS `e-commerce-test`.`catalog_remove_product_attribute_value`;
DROP PROCEDURE IF EXISTS `e-commerce-test`.`catalog_remove_product_from_category`;
DROP PROCEDURE IF EXISTS `e-commerce-test`.`catalog_search`;
DROP PROCEDURE IF EXISTS `e-commerce-test`.`catalog_set_image`;
DROP PROCEDURE IF EXISTS `e-commerce-test`.`catalog_set_image_2`;
DROP PROCEDURE IF EXISTS `e-commerce-test`.`catalog_set_product_display_option`;
DROP PROCEDURE IF EXISTS `e-commerce-test`.`catalog_set_thumbnail`;
DROP PROCEDURE IF EXISTS `e-commerce-test`.`catalog_update_attribute`;
DROP PROCEDURE IF EXISTS `e-commerce-test`.`catalog_update_attribute_value`;
DROP PROCEDURE IF EXISTS `e-commerce-test`.`catalog_update_category`;
DROP PROCEDURE IF EXISTS `e-commerce-test`.`catalog_update_department`;
DROP PROCEDURE IF EXISTS `e-commerce-test`.`catalog_update_product`;
DROP PROCEDURE IF EXISTS `e-commerce-test`.`customer_add`;
DROP PROCEDURE IF EXISTS `e-commerce-test`.`customer_get_customer`;
DROP PROCEDURE IF EXISTS `e-commerce-test`.`customer_get_customer_by_email`;
DROP PROCEDURE IF EXISTS `e-commerce-test`.`customer_get_customers_list`;
DROP PROCEDURE IF EXISTS `e-commerce-test`.`customer_get_login_info`;
DROP PROCEDURE IF EXISTS `e-commerce-test`.`customer_get_shipping_regions`;
DROP PROCEDURE IF EXISTS `e-commerce-test`.`customer_update_account`;
DROP PROCEDURE IF EXISTS `e-commerce-test`.`customer_update_address`;
DROP PROCEDURE IF EXISTS `e-commerce-test`.`customer_update_credit_card`;
DROP PROCEDURE IF EXISTS `e-commerce-test`.`orders_create_audit`;
DROP PROCEDURE IF EXISTS `e-commerce-test`.`orders_get_audit_trail`;
DROP PROCEDURE IF EXISTS `e-commerce-test`.`orders_get_by_customer_id`;
DROP PROCEDURE IF EXISTS `e-commerce-test`.`orders_get_most_recent_orders`;
DROP PROCEDURE IF EXISTS `e-commerce-test`.`orders_get_order_details`;
DROP PROCEDURE IF EXISTS `e-commerce-test`.`orders_get_order_info`;
DROP PROCEDURE IF EXISTS `e-commerce-test`.`orders_get_orders_between_dates`;
DROP PROCEDURE IF EXISTS `e-commerce-test`.`orders_get_orders_by_status`;
DROP PROCEDURE IF EXISTS `e-commerce-test`.`orders_get_order_short_details`;
DROP PROCEDURE IF EXISTS `e-commerce-test`.`orders_get_shipping_info`;
DROP PROCEDURE IF EXISTS `e-commerce-test`.`orders_set_auth_code`;
DROP PROCEDURE IF EXISTS `e-commerce-test`.`orders_set_date_shipped`;
DROP PROCEDURE IF EXISTS `e-commerce-test`.`orders_update_order`;
DROP PROCEDURE IF EXISTS `e-commerce-test`.`orders_update_status`;
DROP PROCEDURE IF EXISTS `e-commerce-test`.`shopping_cart_add_product`;
DROP PROCEDURE IF EXISTS `e-commerce-test`.`shopping_cart_count_old_carts`;
DROP PROCEDURE IF EXISTS `e-commerce-test`.`shopping_cart_create_order`;
DROP PROCEDURE IF EXISTS `e-commerce-test`.`shopping_cart_delete_old_carts`;
DROP PROCEDURE IF EXISTS `e-commerce-test`.`shopping_cart_empty`;
DROP PROCEDURE IF EXISTS `e-commerce-test`.`shopping_cart_get_products`;
DROP PROCEDURE IF EXISTS `e-commerce-test`.`shopping_cart_get_recommendations`;
DROP PROCEDURE IF EXISTS `e-commerce-test`.`shopping_cart_get_saved_products`;
DROP PROCEDURE IF EXISTS `e-commerce-test`.`shopping_cart_get_total_amount`;
DROP PROCEDURE IF EXISTS `e-commerce-test`.`shopping_cart_move_product_to_cart`;
DROP PROCEDURE IF EXISTS `e-commerce-test`.`shopping_cart_remove_product`;
DROP PROCEDURE IF EXISTS `e-commerce-test`.`shopping_cart_save_product_for_later`;
DROP PROCEDURE IF EXISTS `e-commerce-test`.`shopping_cart_update`;
